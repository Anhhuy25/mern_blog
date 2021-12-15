import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  USER_LOAD_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from "./constants";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

// Load user
// Khi có token rồi, thì khi gửi api tới server sẽ gửi kèm token (theo hiểu là vậy)
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("http://localhost:4000/api/auth");

    if (res.data.success) {
      dispatch({ type: USER_LOADED, payload: res.data });
    }
  } catch (error) {
    localStorage.removeItem("token");
    setAuthToken(null);
    dispatch({ type: USER_LOAD_FAIL });
  }
};

// Register
export const register = (user) => async (dispatch) => {
  try {
    const res = await axios.post(
      "http://localhost:4000/api/auth/register",
      user
    );
    if (res.data.success) {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (!errors.success) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({ type: REGISTER_FAIL });
  }
};

// Login
export const login = (user) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:4000/api/auth/login", user);

    if (res.data.success) {
      dispatch({ type: LOGIN_SUCCESS, payload: res.data.accessToken });
    }
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (!errors.success) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({ type: LOGIN_FAIL });
  }
};

// Logout
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  dispatch({ type: CLEAR_PROFILE });
};
