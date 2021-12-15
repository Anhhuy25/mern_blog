const Post = require("../models/Post");
const User = require("../models/User");
const { validationResult } = require("express-validator");

class PostController {
  // @desc  Create a post
  // @route POST /create
  async createPost(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const user = await User.findById(req.user).select("-password");
      const newPost = new Post({
        user: req.user,
        text: req.body.text,
        name: user.username,
        avatar: user.avatar,
      });

      await newPost.save();
      res.json({ success: true, msg: "Create post successfully", newPost });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: error.message });
    }
  }

  // @desc  Get all posts
  // @route GET /all_posts
  async getAllPosts(req, res) {
    try {
      const posts = await Post.find().sort({ date: -1 });
      res.json({ success: true, msg: "Get all posts successfully", posts });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: error.message });
    }
  }

  // @desc  Get post by Id
  // @route GET /:id
  async getPostById(req, res) {
    try {
      const post = await Post.findById(req.params.id);
      // Check post
      if (!post) {
        return res.status(404).json({ success: false, msg: "Post not found!" });
      }

      res.json({ success: true, msg: "Get post successfully", post });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: error.message });
    }
  }

  // @desc  Delete post
  // @route DELETE /delete/:id
  async deletePost(req, res) {
    try {
      const post = await Post.findById(req.params.id);

      // Check post
      if (!post) {
        return res.status(404).json({ success: false, msg: "Post not found!" });
      }
      // Check user
      if (post.user.toString() !== req.user) {
        return res
          .status(401)
          .json({ success: false, msg: "User not authorized" });
      }

      await post.remove();
      res.json({ success: true, msg: "Post removed" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: error.message });
    }
  }

  // @desc  Like a post
  // @route PUT /like/:id
  async likePost(req, res) {
    try {
      const post = await Post.findById(req.params.id);
      // Post has been liked
      const postsLiked = post.likes.filter(
        (like) => like.user.toString() === req.user
      );
      if (postsLiked.length > 0) {
        return res
          .status(400)
          .json({ success: false, msg: "Post already liked" });
      }

      post.likes.unshift({ user: req.user });
      await post.save();
      res.json({ success: true, msg: "Like a post successfully", post });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: error.message });
    }
  }

  // @desc  Unlike a post
  // @route PUT /unlike/:id
  async unlikePost(req, res) {
    try {
      const post = await Post.findById(req.params.id);
      // Post has been liked
      const postsLiked = post.likes.filter(
        (like) => like.user.toString() === req.user
      );
      if (postsLiked.length === 0) {
        return res
          .status(400)
          .json({ success: false, msg: "Post has not yet been liked" });
      }

      // Remove post like
      const removeIndex = post.likes.map((like) =>
        like.user.toString().indexOf(req.user)
      );
      post.likes.splice(removeIndex, 1);

      await post.save();
      res.json({ success: true, msg: "Unlike a post successfully", post });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: error.message });
    }
  }

  // @desc  Add comment a post
  // @route PUT /comment/:postId
  async commentPost(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const post = await Post.findById(req.params.postId);
      const user = await User.findById(req.user);

      if (!post) {
        return res.status(404).json({ success: false, msg: "Post not found!" });
      }

      const newComment = {
        text: req.body.text,
        user: req.user,
        name: user.username,
        avatar: user.avatar,
      };
      post.comments.unshift(newComment);

      await post.save();
      res.json({ success: true, msg: "Add comment successfully", post });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: error.message });
    }
  }

  // @desc  Remove comment
  // @route DELETE /remove_comment/:postId/:comment_id
  async removeComment(req, res) {
    try {
      const post = await Post.findById(req.params.postId);

      // Pull out comment
      const comment = post.comments.find(
        (comment) => comment.id === req.params.commentId
      );
      // Make sure comment exists
      if (!comment) {
        return res.status(404).json({ msg: "Comment does not exist" });
      }
      // Check user
      if (comment.user.toString() !== req.user) {
        return res.status(401).json({ msg: "User not authorized" });
      }

      post.comments = post.comments.filter(
        ({ id }) => id !== req.params.commentId
      );

      await post.save();
      res.json({ success: true, msg: "Remove comment successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: error.message });
    }
  }
}

module.exports = new PostController();
