import * as ActionTypes from './ActionTypes';

const initialBillTypeState = null; // Đặt giá trị mặc định là null

export const billType = (state = initialBillTypeState, action) => {
  switch (action.type) {
    case ActionTypes.SET_BILL_TYPE:
      return action.payload;
    default:
      return state;
  }
};
