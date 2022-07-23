import {
  AUTH_ERROR,
  LOGIN,
  REGISTER,
  UPDATE_INFO_USERS,
  CLEAR,
  LOGOUT,
  GET_USER,
  GET_USER_ERROR,
  SEND_LINK_RESET,
  SEND_LINK_ERROR,
  GET_LINK_RESET,
  GET_LINK_ERROR,
  RESET_PASSWORD,
  RESET_PASSWORD_ERROR,
} from "../actions/types";

const initialState = {
  isAuthenticated: !!localStorage.getItem("token"),
  token: localStorage.getItem("token"),
  user: null,
  status: null,
  error: null,
  detailUser: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem("token", action.token);
      return {
        ...state,
        isAuthenticated: true,
        token: action.token,
        user: action.user,
      };
    case REGISTER:
      return {
        ...state,
        status: action.status,
      };
    case UPDATE_INFO_USERS:
      return {
        ...state,
        user: action.user,
        status: action.status,
      };
    case LOGOUT:
      localStorage.removeItem("token");
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
        error: null,
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
    case GET_USER:
      return {
        ...state,
        detailUser: action.payload,
      };
    case GET_USER_ERROR:
      return {
        ...state,
        error: action.payload,
        status: "FAIL",
      };
    case SEND_LINK_RESET:
      return {
        ...state,
        token: action.token,
        user: action.user,
        message: action.message,
      };
    case SEND_LINK_ERROR:
      return {
        ...state,
        token: null,
        error: action.payload,
      };
    case GET_LINK_RESET:
      return {
        ...state,
        message: action.message,
      };
    case GET_LINK_ERROR:
      return {
        ...state,
        token: null,
        error: action.payload,
      };
    case RESET_PASSWORD:
      return {
        ...state,
        token: action.token,
        user: action.user,
        message: action.message,
      };
    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        token: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
