const router = require("express").Router();
const { body } = require("express-validator");
const validateRequest = require("../middlewares/validateBodyRequest");

const { loadItem } = require("../middlewares/preload");
const { hasUser, isOwner } = require("../middlewares/guards");
const { paginationMiddleware } = require("../middlewares/paginationMiddleware");
const { formatPaginatedResponse } = require("../utils/formatPaginatedResponse");

const {
  getAllWithouthPagination,
  getAll,
  getById,
  getByUserId,
  createItem,
  updateItem,
  deleteById,
  createComment,
  deleteComment,
  likeItem,
  dislikeItem
} = require("../services/postService");



router.get("/", paginationMiddleware(), async (req, res, next) => {
  try {
    const { page, limit, skip } = req.pagination;

    const { paginatedPosts, totalPosts } = await getAll(skip, limit);

    if (paginatedPosts.length === 0) {
      throw new Error("No posts found.");
    }

    res.status(200).json(formatPaginatedResponse(paginatedPosts, page, limit, totalPosts));

  } catch (error) {
    next(error);
  }

})


router.get("/all", async (req, res, next) => {
  try {

    const allPosts = await getAllWithouthPagination();

    if (!allPosts) {
      throw new Error("No posts found.");
    }

    res.status(200).json(allPosts)

  } catch (error) {
    next(error);
  }

})

router.get("/:id", async (req, res, next) => {
  try {
    const post = await getById(req.params.id);

    if (!post) {
      throw new Error("Post not found.");
    }
    res.status(200).json(post);

  } catch (error) {
    next(error);
  }

});

router.post("/create", hasUser(),
  body("postTitle", "Title is required").not().isEmpty(),
  body("postTitle", "Please enter a title up to 150 characters long").isLength({ max: 150 }),
  body("postImageUrl", "Please upload a file or drag and drop").not().isEmpty(),
  body("postCategory", "Category is required").not().isEmpty(),
  body("postText", "Post is required").not().isEmpty(),
  body("postText", "Please enter a post up to 3000 characters long").isLength({ max: 3000 }),
  body("postTags", "post tags are required").not().isEmpty(),
  validateRequest,
  async (req, res, next) => {

    try {
      const userId = req.user._id;
      const user = await getByUserId(userId);

      if (!user) {
        throw new Error("Invalid access token.");
      }

      const post = {
        name: user.name,
        postTitle: req.body.postTitle,
        postImageUrl: req.body.postImageUrl,
        postCategory: req.body.postCategory,
        postText: req.body.postText,
        postTags: req.body.postTags?.split(",").map(tags => tags.trim()), // Add up to 5 tags
        avatar: user.avatar,
        ownerId: userId,
      }

      const createPost = await createItem(userId, post);

      res.status(200).json(createPost);

    } catch (error) {
      next(error);
    }

  })


router.put("/update/:id", loadItem("Post"), isOwner(),
  body("postTitle", "Title is required").not().isEmpty(),
  body("postTitle", "Please enter a title up to 150 characters long").isLength({ max: 150 }),
  body("postImageUrl", "Please upload a file or drag and drop").not().isEmpty(),
  body("postCategory", "Category is required").not().isEmpty(),
  body("postText", "Post is required").not().isEmpty(),
  body("postText", "Please enter a post up to 3000 characters long").isLength({ max: 3000 }),
  body("postTags", "post tags are required").not().isEmpty(),
  validateRequest,
  async (req, res, next) => {
    try {
      const postId = req.params.id;

      const postData = { postTitle, postImageUrl, postCategory, postText, postTags } = req.body;

      const updatedPost = await updateItem(postId, postData);

      res.status(200).json(updatedPost);

    } catch (error) {
      next(error);
    }

  })

router.delete("/delete/:id", loadItem("Post"), isOwner(),
  async (req, res, next) => {
    try {

      await deleteById(req.params.id, req.user._id);

      res.status(200).json({ message: "Post deleted." });

    } catch (error) {
      next(error);
    }
  })

router.post("/comment/:postId/create", hasUser(),
  body("text", "Comment is required").not().isEmpty(),
  body("text", "Comment shouldn't contain more than 250 characters").isLength({ max: 250 }),
  validateRequest,
  async (req, res, next) => {

    try {
      const userId = req.user._id;
      const user = await getByUserId(userId);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: userId,
      }

      const comment = await createComment(req.params.postId, newComment);

      if (!comment) {
        throw new Error("Failed to create comment.");
      }

      res.status(200).json(comment);


    } catch (error) {
      next(error);
    }

  })

//comment/:postId/:commentId
router.delete("/comment/:id/:commentId", hasUser(), loadItem("Post"),
  async (req, res, next) => {

    try {
      const userId = req.user._id;
      const postId = req.params.id;
      const commentId = req.params.commentId;

      const post = req.item;

      const userComment = post.comments.find(comment => comment.id === commentId);

      if (!userComment) {
        throw new Error("Comment does'n exist.");
      }

      if (userComment.user.toString() !== userId) {
        throw new Error("You cannot modify this record.");
      }

      await deleteComment(postId, commentId);

      res.status(200).json({ message: "Comment deleted" });


    } catch (error) {
      next(error);
    }

  })

router.post("/like/:id", hasUser(), loadItem("Post"), async (req, res, next) => {
  try {
    const userId = req.user._id;
    const postId = req.params.id;
    const post = req.item;
    

    if (post.ownerId.toString() === userId.toString()) {
      throw new Error("Not able to like your own post.");
    }

    if (post.postLikes.map(id => id.toString()).includes(userId.toString())) {
      throw new Error("Post already liked.");
    }

    const updatedPost = await likeItem(postId, userId);
    
    return res.status(200).json(updatedPost); 
    
  } catch (error) {
    next(error);
  }
});

router.post("/unlike/:id", hasUser(), loadItem("Post"),
  async (req, res, next) => {

    try {
      const userId = req.user._id;
      const postId = req.params.id;
      const post = req.item;

      if (post.ownerId.toString() == userId.toString()) {
        throw new Error("Not able to dislike your own post.");
      }

      if (post.postLikes.some(user => user._id.equals(req.user._id)) == false) {
        throw new Error("Post has not been liked yet.");
      }

      if (post.ownerId._id.toString() !== req.user._id.toString() && post.postLikes.some(user => user._id.equals(req.user._id)) == true) {

        await dislikeItem(postId, userId);

        return res.status(200).json({ message: "Unlike!" });
      }


    } catch (error) {
      next(error);
    }

  })


module.exports = router;