import * as ActionTypes from './ActionTypes';

const initialState = {
  isLoading: true,
  errMess: null,
  customer: []
};

export const customer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_CUSTOMER:
      return { ...state, isLoading: false, errMess: null, customer: action.payload };

    case ActionTypes.CUSTOMER_LOADING:
      return { ...state, isLoading: true, errMess: null, customer: [] };

    case ActionTypes.CUSTOMER_FAILED:
      return { ...state, isLoading: false, errMess: action.payload, customer: [] };

    default:
      return state;
  }
};
