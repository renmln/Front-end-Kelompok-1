import {
  GET_ALL_NOTIFICATION,
  NOTIFICATION_ERROR,
  UPDATE_NOTIFICATION,
} from "../actions/types";

const initialState = {
  notification: [],
  status: [],
  error: null,
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_NOTIFICATION:
      return {
        ...state,
        notification: action.notification,
        status: action.status,
      };
    case NOTIFICATION_ERROR:
      return {
        ...state,
        error: action.payload,
        status: "FAIL",
      };
    case UPDATE_NOTIFICATION:
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export default notificationReducer;
