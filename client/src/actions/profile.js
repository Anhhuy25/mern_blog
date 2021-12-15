import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  ACCOUNT_DELETE,
  CLEAR_PROFILE,
  GET_PROFILES,
} from "./constants";
import { setAlert } from "./alert";

// Get user profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:4000/api/profile/user/me");

    if (res.data.success) {
      dispatch({
        type: GET_PROFILE,
        payload: res.data.profile,
      });
    }
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Create profile
export const createProfile =
  (data, navigate, edit = true) =>
  async (dispatch) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/profile/user/create_update",
        data
      );

      if (res.data.success) {
        dispatch({
          type: GET_PROFILE,
          payload: res.data.profile,
        });
        dispatch(
          setAlert(edit ? "Profile Created" : "Profile Updated", "success")
        );
        navigate("/dashboard");
      }
    } catch (err) {
      const errors = err.response.data.errors;
      if (!errors.success) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };

// Add experience
export const addExperience = (data, navigate) => async (dispatch) => {
  try {
    const res = await axios.put(
      "http://localhost:4000/api/profile/user/experience",
      data
    );

    if (res.data.success) {
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data.profile,
      });
      dispatch(setAlert("Experience added", "success"));
      navigate("/dashboard");
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (!errors.success) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Delete experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `http://localhost:4000/api/profile/user/delete_exp/${id}`
    );

    if (res.data.success) {
      dispatch({
        type: GET_PROFILE,
        payload: res.data.profile,
      });
      dispatch(setAlert("Experience removed", "success"));
    }
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Add education
export const addEducation = (data, navigate) => async (dispatch) => {
  try {
    const res = await axios.put(
      "http://localhost:4000/api/profile/user/education",
      data
    );

    if (res.data.success) {
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data.profile,
      });
      dispatch(setAlert("Education added", "success"));
      navigate("/dashboard");
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (!errors.success) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

// Delete education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `http://localhost:4000/api/profile/user/delete_edu/${id}`
    );

    if (res.data.success) {
      dispatch({
        type: GET_PROFILE,
        payload: res.data.profile,
      });
      dispatch(setAlert("Education removed", "success"));
    }
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Delete account
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Do you want to delete your account?")) {
    try {
      const res = await axios.delete(
        "http://localhost:4000/api/profile/user/delete"
      );

      if (res.data.success) {
        dispatch({ type: CLEAR_PROFILE });
        dispatch({ type: ACCOUNT_DELETE });
      }
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  }
};

// Get all profiles
export const getProfiles = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:4000/api/profile/user/all");

    if (res.data.success) {
      dispatch({
        type: GET_PROFILES,
        payload: res.data.profiles,
      });
    }
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Get profile by userId
export const getProfileByUserId = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:4000/api/profile/user/${id}`);

    if (res.data.success) {
      dispatch({
        type: GET_PROFILE,
        payload: res.data.profile,
      });
    }
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
