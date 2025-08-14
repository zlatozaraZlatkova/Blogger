const router = require("express").Router();
const { body, validationResult } = require("express-validator");

const { createItem, updateItem, deleteById } = require("../services/sectionService");
const { isSectionOwner, isBoardOwner } = require("../middlewares/guards");


router.post("/:id/create", isBoardOwner(),
  body("title", "Section title is required").not().isEmpty(),
  body("title", "Please enter a title up to 20 characters long").isLength({ max: 20 }),
  async (req, res, next) => {
    const board = res.locals.board;

    try {
      const { errors } = validationResult(req);

      if (errors.length > 0) {
        throw errors;
      }

      const userId = req.user._id;

      const section = {
        title: req.body.title,
        boardId: req.params.id,
        ownerId: req.user._id,
      };
      //console.log(section)

      const createdSection = await createItem(userId, board._id, section);

      res.json(createdSection);
    } catch (error) {
      next(error);
    }
  }
);

router.put("/edit/:id", isSectionOwner(),
  body("title", "Section title is required").not().isEmpty(),
  body("title", "Please enter a title up to 20 characters long").isLength({ max: 20 }),
  async (req, res, next) => {
    try {
      const { errors } = validationResult(req);
      const section = res.locals.section;  
      //console.log(section)

      if (errors.length > 0) {
        throw errors;
      }

      const updateSection = await updateItem(section._id, req.body);

      res.json(updateSection);
    } catch (error) {
       next(error);
    }
  }
);

router.delete("/delete/:id", isSectionOwner(), async (req, res, next) => {
  try {
    const section = res.locals.section;  
    const userId = req.user._id;

    await deleteById(section._id, section.boardId, userId);

    res.json({ message: "Section deleted" });

  } catch (error) {
     next(error);
  }
});




module.exports = router;
