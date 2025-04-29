const router = require("express").Router();
const { body, validationResult } = require("express-validator");

const { getAll, getById, createItem, deleteById, updateItem } = require("../services/taskService");
const { isTaskOwner, isSectionOwner } = require("../middlewares/guards");
const { errorParser } = require("../utils/errorParser");

router.get("/", async (req, res) => {
  try {
    const tasks = await getAll();

    if (tasks.length === 0) {
      return res.status(404).json({ message: "There are no tasks available yet" });
    }

    res.json(tasks);

  } catch (error) {
    const message = errorParser(error);
    res.status(400).json({ message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    
    const task = await getById(req.params.id);

    if (!task) {
      throw errors;
    }

    res.json(task);

  } catch (error) {
    const message = errorParser(error);
    res.status(400).json({ message });
  }
});

// @route   POST api/tasks/:idSection/create
router.post("/:id/create", isSectionOwner(),
  body("title", "Task title is required").not().isEmpty(),
  body("title", "Please enter a title up to 20 characters long").isLength({ max: 20 }),
  body("description", "Description is required").not().isEmpty(),
  body("description", "Please enter a description up to 250 characters long").isLength({ max: 250 }),
  body("status", "Please ").isLength({ max: 250 }),
  async (req, res) => {
    try {
      const { errors } = validationResult(req);

      const userId = req.user._id;
      const section = res.locals.section;

      if (errors.length > 0) {
        throw errors;
      }

      const task = {
        sectionId: section._id,
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        ownerId: req.user._id,
      };

      console.log(task);

      const createdTask = await createItem(userId, section._id, task);

      res.json(createdTask);

    } catch (error) {
      const message = errorParser(error);
      res.status(400).json({ message });
    }
  }
);

router.put("/:id/edit", isTaskOwner(),
  body("title", "Task title is required").not().isEmpty(),
  body("title", "Please enter a title up to 20 characters long").isLength({ max: 20 }),
  body("description", "Description is required").not().isEmpty(),
  body("description", "Please enter a description up to 250 characters long").isLength({ max: 250 }),
  body("status", "Please ").isLength({ max: 250 }),
  async (req, res) => {
    try {
      const { errors } = validationResult(req);
      const task = res.locals.task;

      if (errors.length > 0) {
        throw errors;
      }

      const updatedTask = await updateItem(task._id, req.body);

      res.json(updatedTask);

    } catch (error) {
      const message = errorParser(error);
      res.status(400).json({ message });
    }
  }
);

router.delete("/:id/delete", isTaskOwner(), async (req, res) => {
  try {
    const task = res.locals.task;

    await deleteById(req.params.id, task.sectionId, req.user._id);

    res.json({ message: "Task deleted" });

  } catch (error) {
    const message = errorParser(error);
    res.status(400).json({ message });
  }
});

module.exports = router;
