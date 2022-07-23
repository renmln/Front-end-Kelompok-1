import {
  GET_ALL_TRANSACTION,
  CREATE_TRANSACTION,
  TRANSACTION_ERROR,
  UPDATE_TRANSACTION,
} from "../actions/types";

const initialState = {
  transaction: [],
  detailTransaction: [],
  status: [],
  error: null,
};

const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TRANSACTION:
      return {
        ...state,
        transaction: action.transaction,
        status: action.status,
      };
    case CREATE_TRANSACTION:
      return {
        ...state,
        status: action.status,
      };
    case UPDATE_TRANSACTION:
      return {
        ...state,
        status: action.payload,
      };
    case TRANSACTION_ERROR:
      return {
        ...state,
        error: action.payload,
        status: "FAIL",
      };
    default:
      return state;
  }
};

export default transactionReducer;
