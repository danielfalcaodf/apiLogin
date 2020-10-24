const express = require("express");
const cors = require("cors");
const auth = require("../controllers/authController");
const appController = require("../controllers/appController");
const authMiddleware = require("../middlewares/auth");
const router = express.Router();
const allowedOrigins = [
  "capacitor://localhost",
  "ionic://localhost",
  "http://localhost",
  "http://localhost:8080",
  "http://localhost:8100",
];

// Reflect the origin if it's in the allowed list or not defined (cURL, Postman, etc.)
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Origin not allowed by CORS"));
    }
  },
};

// Enable preflight requests for all routes

// module.exports = routes;

module.exports = (app) => {
  app.options("*", cors(corsOptions));
  router.post("/register", auth.register);
  router.post("/signin", auth.Authenticate);
  router.get("/isauth", authMiddleware, auth.isAuth);
  app.use("/auth", cors(corsOptions), router);
  router.get("/", authMiddleware, appController.home);
  app.use("/app", cors(corsOptions), router);
};
