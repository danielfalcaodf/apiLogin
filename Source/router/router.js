const express = require("express");

const auth = require("../controllers/auth");

const router = express.Router();

// module.exports = routes;

module.exports = (app) => {
  router.post("/register", auth.register);
  router.post("/signin", auth.Authenticate);
  app.use("/auth", router);
};
