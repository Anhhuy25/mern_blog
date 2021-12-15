import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  USER_LOAD_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETE,
} from "../actions/constants";

const initialState = {
  isAuthenticated: null,
  loading: true,
  user: null,
};

const auth = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload.user,
      };
    case REGISTER_FAIL:
    case USER_LOAD_FAIL:
    case LOGIN_FAIL:
      return { ...state, isAuthenticated: false, loading: false, user: null };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload);
      return { ...state, isAuthenticated: true, loading: false };
    case LOGOUT:
    case ACCOUNT_DELETE:
      localStorage.removeItem("token");
      return { ...state, isAuthenticated: false, loading: false, user: null };
    default:
      return state;
  }
};

export default auth;
