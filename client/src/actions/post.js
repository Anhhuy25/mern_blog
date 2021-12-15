import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKE,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "./constants";
import axios from "axios";
import { setAlert } from "./alert";

// Get all posts
export const getAllPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:4000/api/post/all_posts");

    if (res.data.success) {
      dispatch({
        type: GET_POSTS,
        payload: res.data.posts,
      });
    }
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Like a post
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`http://localhost:4000/api/post/like/${id}`);

    if (res.data.success) {
      dispatch({
        type: UPDATE_LIKE,
        payload: { id, post: res.data.post },
      });
    }
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Unlike a post
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`http://localhost:4000/api/post/unlike/${id}`);

    if (res.data.success) {
      dispatch({
        type: UPDATE_LIKE,
        payload: { id, post: res.data.post },
      });
    }
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete a post
export const deletePost = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `http://localhost:4000/api/post/delete/${id}`
    );
    if (res.data.success) {
      dispatch({
        type: DELETE_POST,
        payload: id,
      });
      dispatch(setAlert("Post removed", "success"));
    }
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add a post
export const addPost = (data) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:4000/api/post/create", data);

    if (res.data.success) {
      dispatch({
        type: ADD_POST,
        payload: res.data.newPost,
      });
      dispatch(setAlert("Post added", "success"));
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (!errors.success) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get a post
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:4000/api/post/${id}`);

    if (res.data.success) {
      dispatch({
        type: GET_POST,
        payload: res.data.post,
      });
    }
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add comment
export const addComment = (postId, text) => async (dispatch) => {
  try {
    const res = await axios.post(
      `http://localhost:4000/api/post/comment/${postId}`,
      text
    );

    if (res.data.success) {
      dispatch({
        type: ADD_COMMENT,
        payload: res.data.post.comments,
      });
    }
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Remove comment
export const removeComment = (postId, commentId) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `http://localhost:4000/api/post/remove_comment/${postId}/${commentId}`
    );

    if (res.data.success) {
      dispatch({
        type: REMOVE_COMMENT,
        payload: commentId,
      });
    }
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
