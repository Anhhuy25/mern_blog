const { validationResult } = require("express-validator");
const Profile = require("../models/Profile");
const User = require("../models/User");
const Post = require("../models/Post");

class ProfileController {
  // @desc  Get current user profiles
  // @route GET /user/me
  async getProfile(req, res) {
    try {
      const profile = await Profile.findOne({ user: req.user }).populate(
        "user",
        ["username", "avatar"]
      );

      if (!profile) {
        return res
          .status(400)
          .json({ success: false, msg: "There is no profile for this user!" });
      }
      res.json({
        success: true,
        msg: "Get current profile succefully",
        profile,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: error });
    }
  }

  // @desc  Create and Update profiles
  // @route POST /user/create_update
  async createUpdateProfile(req, res) {
    const {
      location,
      status,
      skills,
      bio,
      githubusername,
      twitter,
      facebook,
      instagram,
    } = req.body;

    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Create profile
      const newProfile = {};
      newProfile.user = req.user;
      newProfile.location = location;
      newProfile.status = status;
      newProfile.bio = bio;
      newProfile.githubusername = githubusername;
      if (skills) {
        newProfile.skills = skills.split(",").map((skill) => skill.trim());
      }
      newProfile.social = {};
      if (twitter) newProfile.social.twitter = twitter;
      if (facebook) newProfile.social.facebook = facebook;
      if (instagram) newProfile.social.instagram = instagram;

      // Update profile
      let profile = await Profile.findOne({ user: req.user });
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user },
          { $set: newProfile },
          { new: true }
        );

        return res.json({ success: true, msg: "Profile Updated", profile });
      }

      profile = await new Profile(newProfile);
      await profile.save();
      res.json({ success: true, msg: "Profile Created", profile });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: error });
    }
  }

  // @desc  Get all user profiles
  // @route GET /user/all
  async getAllProfiles(req, res) {
    try {
      const profiles = await Profile.find().populate("user", [
        "username",
        "avatar",
      ]);
      res.json({
        success: true,
        msg: "Get all profiles successfully",
        profiles,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: error });
    }
  }

  // @desc  Get user profile by userId
  // @route GET /user/:user_id
  async getProfileById(req, res) {
    try {
      const profile = await Profile.findOne({
        user: req.params.user_id,
      }).populate("user", ["username", "avatar"]);

      if (!profile) {
        return res
          .status(400)
          .json({ success: false, msg: "Profile not found" });
      }

      res.json({
        success: true,
        msg: "Get profile by userId successfully",
        profile,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: error });
    }
  }

  // @desc  Delete profile, user, posts
  // @route DELETE /user/delete
  async deleteAll(req, res) {
    try {
      // Remove posts
      await Post.deleteMany({ user: req.user });
      // Remove profile
      await Profile.findOneAndRemove({ user: req.user });
      // Remove user
      await User.findOneAndRemove({ _id: req.user });

      res.json({ success: true, msg: "User deleted" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: error });
    }
  }

  // @desc  Add profile experience
  // @route PUT /user/experience
  async addExperience(req, res) {
    const { company, location, from, to, current, description } = req.body;

    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const newExp = { company, location, from, to, current, description };
      const profile = await Profile.findOne({ user: req.user });
      // Add experience
      profile.experience.unshift(newExp);
      await profile.save();

      res.json({ success: true, msg: "Add experience successfully", profile });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: error });
    }
  }

  // @desc  Delete profile experience
  // @route DELETE /user/delete_exp/:exp_id
  async deleteExperience(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let profile = await Profile.findOne({ user: req.user });
      const newExp = profile.experience.filter(
        (exp) => exp._id.toString() !== req.params.exp_id
      );
      profile.experience = newExp;
      await profile.save();

      res.json({ success: true, msg: "Experience deleted", profile });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: error });
    }
  }

  // @desc  Add profile education
  // @route PUT /user/education
  async addEducation(req, res) {
    const { school, degree, fieldofstudy, from, to, current, description } =
      req.body;

    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description,
      };
      const profile = await Profile.findOne({ user: req.user });
      // Add education
      profile.education.unshift(newEdu);
      await profile.save();

      res.json({ success: true, msg: "Add education successfully", profile });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: error });
    }
  }

  // @desc  Delete profile education
  // @route DELETE /user/delete_edu/:edu_id
  async deleteEducation(req, res) {
    try {
      let profile = await Profile.findOne({ user: req.user });
      const newEdu = profile.education.filter(
        (edu) => edu._id.toString() !== req.params.edu_id
      );
      profile.education = newEdu;
      await profile.save();

      res.json({ success: true, msg: "Education deleted", profile });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: error });
    }
  }
}

module.exports = new ProfileController();
