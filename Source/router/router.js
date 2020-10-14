const express = require("express");

const auth = require("../controllers/authController");
const appController = require("../controllers/appController");
const authMiddleware = require("../middlewares/auth");
const router = express.Router();

// module.exports = routes;

module.exports = (app) => {
  router.post("/register", auth.register);
  router.post("/signin", auth.Authenticate);
  app.use("/auth", router);
  router.get("/", authMiddleware, appController.home);
  app.use("/app", router);
};
