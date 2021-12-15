const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const verifyToken = require("../app/middlewares/auth");
const authController = require("../app/controllers/AuthController");

router.post(
  "/register",
  body("username", "Please enter your username").not().isEmpty(),
  body("email", "Please enter a valid email").isEmail(),
  body(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
  authController.register
);
router.post(
  "/login",
  body("username", "Missing username and/or password").not().isEmpty(),
  body("password", "Missing username and/or password").not().isEmpty(),
  authController.login
);
router.get("/", verifyToken, authController.checkUserLogin);

module.exports = router;
