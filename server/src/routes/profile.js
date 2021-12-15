const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const verifyToken = require("../app/middlewares/auth");
const profileController = require("../app/controllers/ProfileController");

router.delete(
  "/user/delete_edu/:edu_id",
  verifyToken,
  profileController.deleteEducation
);
router.put(
  "/user/education",
  [
    verifyToken,
    [
      body("school", "School is required").not().isEmpty(),
      body("degree", "Degree is required").not().isEmpty(),
      body("fieldofstudy", "Field of study is required").not().isEmpty(),
      body("from", "From date is required").not().isEmpty(),
    ],
  ],
  profileController.addEducation
);
router.delete(
  "/user/delete_exp/:exp_id",
  verifyToken,
  profileController.deleteExperience
);
router.put(
  "/user/experience",
  [
    verifyToken,
    [
      body("company", "Company is required").not().isEmpty(),
      body("from", "From date is required").not().isEmpty(),
    ],
  ],
  profileController.addExperience
);
router.delete("/user/delete", verifyToken, profileController.deleteAll);
router.get("/user/me", verifyToken, profileController.getProfile);
router.get("/user/all", profileController.getAllProfiles);
router.get("/user/:user_id", profileController.getProfileById);
router.post(
  "/user/create_update",
  [
    verifyToken,
    [
      body("status", "Status is required").not().isEmpty(),
      body("skills", "Skills is required").not().isEmpty(),
    ],
  ],
  profileController.createUpdateProfile
);

module.exports = router;
