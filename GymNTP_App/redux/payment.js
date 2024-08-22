import * as ActionTypes from './ActionTypes';

export const bills = (state = { isLoading: true, errMess: null, bills: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_BILLS:
      return { ...state, isLoading: false, errMess: null, bills: action.payload };
    case ActionTypes.BILLS_LOADING:
      return { ...state, isLoading: true, errMess: null, bills: [] }
    case ActionTypes.BILLS_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };
    default:
      return state;
  }
};