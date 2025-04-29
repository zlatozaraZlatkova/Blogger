const authController = require("../controllers/authController");
const postsController = require("../controllers/postsController");
const boardController = require("../controllers/boardControllers");
const sectionController = require("../controllers/sectionController");
const taskController = require("../controllers/taskController");
const searchController = require("../controllers/searchController");
const teamController = require("../controllers/teamController");
const defaultController = require("../controllers/defaultController");

const checkAuth = require('../middlewares/checkAuth');

module.exports = (app) => {
  app.get("/api/test", (req, res) => {
    res.json({ message: "REST service operational" });
  });

  app.use("/api/auth", authController);
  app.use("/api/boards", checkAuth(true), boardController);
  app.use("/api/sections", checkAuth(true), sectionController);
  app.use("/api/tasks", checkAuth(true), taskController);
  app.use("/api/posts", postsController);
  app.use("/api/search", checkAuth(false), searchController);
  app.use("/api/teams", checkAuth(true), teamController);

  app.use(defaultController);
};
