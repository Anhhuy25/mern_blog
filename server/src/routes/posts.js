const express = require("express");
const router = express.Router();

const postController = require("../app/controllers/PostController");
const verifyToken = require("../app/middlewares/auth");
const { body } = require("express-validator");

router.post(
  "/create",
  [verifyToken, [body("text", "Text is required").not().isEmpty()]],
  postController.createPost
);
router.delete("/delete/:id", verifyToken, postController.deletePost);
router.delete(
  "/remove_comment/:postId/:commentId",
  verifyToken,
  postController.removeComment
);
router.post("/comment/:postId", verifyToken, postController.commentPost);
router.put("/unlike/:id", verifyToken, postController.unlikePost);
router.put("/like/:id", verifyToken, postController.likePost);
router.get("/all_posts", verifyToken, postController.getAllPosts);
router.get("/:id", verifyToken, postController.getPostById);

module.exports = router;
