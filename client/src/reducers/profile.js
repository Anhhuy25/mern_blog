import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
} from "../actions/constants";

const initialState = {
  profiles: [],
  profile: null,
  loading: true,
  error: {},
};

const profile = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return { ...state, profile: payload, loading: false };
    case PROFILE_ERROR:
      return { ...state, error: payload, loading: false };
    case CLEAR_PROFILE:
      return { ...state, profile: null, loading: false };
    case GET_PROFILES:
      return { ...state, profiles: payload, loading: false };
    default:
      return state;
  }
};

export default profile;
