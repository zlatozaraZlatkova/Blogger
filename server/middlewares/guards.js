const { getById } = require("../services/boardService");
const { getById: getSectionById } = require("../services/sectionService");
const { getById: getTaskById } = require("../services/taskService");
const { errorParser } = require("../utils/errorParser");

function hasUser() {
  return (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.status(401).json({ message: 'Please log in' });
    }
  };
}

function isGuest() {
  return (req, res, next) => {
    if (req.user) {
      res.status(400).json({ message: 'You are already logged in' });
    } else {
      next();
    }
  };
}

function isOwner() {
  return (req, res, next) => {

    if (!req.item) {
      return res.status(404).json({ message: "Item not found" });
    }

    const ownerId = req.item.ownerId;

    if (ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }
    next();
  };
}

function isBoardOwner() {
  return async (req, res, next) => {
    try {

      const board = await getById(req.params.id);
      res.locals.board = board;

      if (!board) {
        return res.status(404).json({ message: "Board not found" });
      }

      if (req.user && board.ownerId == req.user._id) {
        res.locals.isBoardOwner = true;
        next();

      } else {
        return res.status(403).json({ message: "No credentials available" });
      }

    } catch (error) {
      const message = errorParser(error)
      res.status(400).json({ message });
    }

  };
}


function isSectionOwner() {
  return async (req, res, next) => {
    try {

      const section = await getSectionById(req.params.id);
      res.locals.section = section;
      console.log(section)


      if (!section) {
        return res.status(404).json({ message: "Section not found" });
      }

      if (req.user && section.ownerId == req.user._id) {
        res.locals.isSectionOwner = true;
        next();

      } else {
        return res.status(403).json({ message: "No credentials available" });
      }

    } catch (error) {
      const message = errorParser(error)
      res.status(400).json({ message });
    }

  };
}

function isTaskOwner() {
  return async (req, res, next) => {
    try {

      const task = await getTaskById(req.params.id);
      res.locals.task = task;

      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      if (req.user && task.ownerId == req.user._id) {
        res.locals.isTaskOwner = true;
        next();

      } else {
        return res.status(403).json({ message: "No credentials available" });
      }

    } catch (error) {
      const message = errorParser(error)
      res.status(400).json({ message });
    }

  };
}


module.exports = {
  hasUser,
  isGuest,
  isOwner,
  isBoardOwner, 
  isSectionOwner, 
  isTaskOwner
};