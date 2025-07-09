const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const rateLimit = require("express-rate-limit");

require("dotenv").config();

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

const databaseConfig = require("./server/config/database");
const routesConfig = require("./server/config/routes");
const corsMiddleware = require("./server/config/cors");

const session = require("./server/middlewares/session");
const errorHandler = require("./server/middlewares/errorHandler");

start();

async function start() {
  const app = express();

  await databaseConfig(app);
  
  app.use(corsMiddleware);

  const maxRequests = NODE_ENV === "production" ? 1000 : 10000;
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: maxRequests,
      legacyHeaders: false,
      standardHeaders: true,
      message: "Too many requests from this IP, please try again later",
    })
  );

  app.use(express.urlencoded({ extended: true }));
  app.set("trust proxy", 1);
  app.use(express.json({ limit: "10mb" }));
  app.use(cookieParser());


  app.use(session());

  if (NODE_ENV === "production") {
    const clientPath = path.join(__dirname, "client/dist");
    app.use(express.static(clientPath));
  }

  routesConfig(app);

 

  if (NODE_ENV === "production") {
    app.get("*", (req, res, next) => {
      if (req.path.startsWith("/api/")) {
        return next();
      }

      const indexPath = path.join(__dirname, "client/dist/index.html");
      res.sendFile(indexPath);
    });
  }

  app.use(errorHandler);

  app.listen(PORT, () => console.log(`Server started on port: ${PORT}...`));
}
