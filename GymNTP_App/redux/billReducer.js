import * as ActionTypes from './ActionTypes';

const initialState = {
  billDetails: null,
  errMess: null,
  isLoading: false,
};

export const billReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.PROCESS_PAYMENT:
      return {
        ...state,
        isLoading: true,
        errMess: null,
      };
    case ActionTypes.PROCESS_PAYMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        billDetails: action.payload,
        errMess: null,
      };
    case ActionTypes.PROCESS_PAYMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        billDetails: null,
      };
    default:
      return state;
  }
};
