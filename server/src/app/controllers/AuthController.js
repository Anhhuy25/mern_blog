const User = require("../models/User");
const argon2 = require("argon2");
const gravatar = require("gravatar");
const { validationResult } = require("express-validator");
const generateAccessToken = require("../tokens/accessToken");

class AuthController {
  // @desc  Check user login
  // @route GET /
  async checkUserLogin(req, res) {
    try {
      const user = await User.findById(req.user).select("-password");
      if (!user) {
        return res.status(400).json({ success: false, msg: "User not found!" });
      }
      res.json({ success: true, user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: error });
    }
  }

  // @desc  Register user
  // @route POST /register
  async register(req, res) {
    const { username, email, password } = req.body;
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Check user exists
      let user = await User.findOne({ email });
      if (user) {
        res
          .status(400)
          .json({ errors: [{ success: false, msg: "User already exists" }] });
      }

      const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });
      const hashedPassword = await argon2.hash(password);
      user = await new User({
        username,
        email,
        password: hashedPassword,
        avatar,
      });
      await user.save();

      res.json({ success: true, user, msg: "Register successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: error });
    }
  }

  // @desc  Login user
  // @route POST /login
  async login(req, res) {
    const { username, password } = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({
          errors: [
            { success: false, msg: "Incorrect username and/or password" },
          ],
        });
      }

      const validPassword = await argon2.verify(user.password, password);
      if (!validPassword) {
        return res.status(400).json({
          errors: [
            { success: false, msg: "Incorrect username and/or password" },
          ],
        });
      }

      const accessToken = generateAccessToken(user);
      res.json({
        success: true,
        msg: "Login successfully",
        accessToken,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: error });
    }
  }
}

module.exports = new AuthController();
