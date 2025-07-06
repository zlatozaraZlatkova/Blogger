const Post = require("../models/Post");
const User = require("../models/User");

async function getAllWithouthPagination() {
    return Post.find({}).sort({ createdAt: -1 });
}

async function getAll(startIndex = 0, limit = 3) {

  const paginatedPosts = await Post.find({})
    .sort({ createdAt: -1 })
    .skip(startIndex)
    .limit(limit)

  const totalPosts = await Post.countDocuments();

  return { paginatedPosts, totalPosts };
}

async function getById(id) {
  return Post.findByIdAndUpdate(
    id,
    { $inc: { views: 1 } },
    { new: true }
  );
}

async function getByUserId(id) {
  return User.findById(id).populate(["name", "avatar"]);
}

async function createItem(userId, data) {
  const newItem = await Post.create(data);
  await User.findByIdAndUpdate(
    userId,
    { $push: { createdPosts: newItem._id } },
    { new: true }
  );

  return newItem;
}

async function updateItem(id, item) {
  return Post.findOneAndUpdate(
    { _id: id },
    { $set: item, $currentDate: { updatedAt: true } },
    { new: true }
  );
}

async function deleteById(postId, userId) {
  await User.findByIdAndUpdate(userId, { $pull: { createdPosts: postId } }, { new: true });
  await Post.findByIdAndDelete(postId);
};

async function createComment(postId, newItem) {
 
  return Post.findOneAndUpdate(
    { _id: postId },
    { $push: { comments: newItem } },
    { new: true }
  )
}

async function deleteComment(postId, commentId) {

  await Post.findByIdAndUpdate(
    { _id: postId },
    { $pull: { comments: {_id: commentId } } },
    { new: true }
  )

  
}


async function likeItem(postId, userId) {
  await User.findByIdAndUpdate(userId, { $push: { likedPostList: postId } }, { new: true });
  await Post.findByIdAndUpdate(postId, { $push: { postLikes: userId } }, { new: true });
  
}

async function dislikeItem(postId, userId) {
  await User.findByIdAndUpdate(userId, { $pull: { likedPostList: postId } }, { new: true });
  await Post.findByIdAndUpdate(postId, { $pull: { postLikes: userId } }, { new: true })
}


module.exports = {
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
};