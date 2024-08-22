import * as ActionTypes from './ActionTypes';

const initialState = {
  attendances: [],
  isLoading: false,
  errMess: null
};

export const attendanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_ATTENDANCE_REQUEST:
    case ActionTypes.FETCH_ATTENDANCES_REQUEST:
    case ActionTypes.FETCH_ATTENDANCES_BY_BILL_ID_REQUEST:
      return { ...state, isLoading: true, errMess: null };
    
    case ActionTypes.ADD_ATTENDANCE_SUCCESS:
      return { ...state, 
        attendances: [...state.attendances, action.payload], 
        isLoading: false, 
        errMess: null };
    
    case ActionTypes.FETCH_ATTENDANCES_SUCCESS:
      return { ...state, attendances: action.payload, isLoading: false, errMess: null };

    case ActionTypes.FETCH_ATTENDANCES_BY_BILL_ID_SUCCESS:
      return { ...state, attendances: action.payload, isLoading: false, errMess: null };

    case ActionTypes.ADD_ATTENDANCE_FAILURE:
    case ActionTypes.FETCH_ATTENDANCES_FAILURE:
    case ActionTypes.FETCH_ATTENDANCES_BY_BILL_ID_FAILURE:
      return { ...state, isLoading: false, errMess: action.payload };
    
    default:
      return state;
  }
};
