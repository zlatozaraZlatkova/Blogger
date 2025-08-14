const authController = require("../controllers/authController");
const postsController = require("../controllers/postsController");
const boardController = require("../controllers/boardControllers");
const sectionController = require("../controllers/sectionController");
const taskController = require("../controllers/taskController");
const searchController = require("../controllers/searchController");
const teamController = require("../controllers/teamController");
const newsletterController = require("../controllers/newsletterController");
const checkAuthController = require("../controllers/checkAuthController");
const googleDriveConfigController = require("../controllers/googleDriveConfig");
const profileController = require("../controllers/profileController");

const checkAuth = require('../middlewares/checkAuth');

module.exports = (app) => {
  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.status(200).json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development"
    });
  });

  // API routes 
  app.use('/api/config', googleDriveConfigController);
  app.use("/api/auth", authController);
  app.use("/api/check-auth", checkAuth(false), checkAuthController);
  app.use("/api/profile", checkAuth(true), profileController);
  app.use("/api/boards", checkAuth(true), boardController);
  app.use("/api/sections", checkAuth(true), sectionController);
  app.use("/api/tasks", checkAuth(true), taskController);
  app.use("/api/posts", checkAuth(false), postsController);
  app.use("/api/search", checkAuth(false), searchController);
  app.use("/api/teams", checkAuth(true), teamController);
  app.use("/api/newsletter", checkAuth(false), newsletterController);

  // Security: Block invalid API routes
  app.use("/api/*", (req, res) => {
    res.status(404).json({ 
      error: "API endpoint not found",
      path: req.path 
    });
  });
};