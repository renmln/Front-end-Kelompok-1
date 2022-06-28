import {
  AUTH_ERROR,
  LOGIN,
  REGISTER,
  UPDATE_INFO_USERS,
  CLEAR,
  LOGOUT,
} from "../actions/types";

const initialState = {
  isAuthenticated: !!localStorage.getItem("token"),
  token: localStorage.getItem("token"),
  user: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem("token", action.payload);
      localStorage.setItem("userEmail", action.user);
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
        user: action.user,
        status: action.status,
      };
    case REGISTER:
      return {
        ...state,
        status: action.status,
      };
    case UPDATE_INFO_USERS:
      return {
        ...state,
        user: action.payload,
        status: action.status,
      };
    case LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("email");
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        error: null,
        status: null,
      };
    case CLEAR:
      return {
        ...state,
        status: null,
      };
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        error: action.payload,
        status: null,
      };
    default:
      return state;
  }
};

export default authReducer;
