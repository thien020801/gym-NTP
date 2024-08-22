import * as ActionTypes from './ActionTypes';
import axios from 'axios';
import moment from 'moment';
const BASE_URL = 'https://ddcf-2402-800-63b3-d774-fd6f-1a26-dac6-7467.ngrok-free.app';
// monthly
export const fetchMonthly = () => (dispatch) => {
  dispatch(monthlyLoading());
  return fetch(`${BASE_URL}/api/get/monthly-subscriptions`)
    .then((response) => {
      if (!response.ok) throw Error('Error ' + response.status + ': ' + response.statusText);
      else return response.json();
    })
    .then((monthly) => dispatch(addMonthly(monthly)))
    .catch((error) => dispatch(monthlyFailed(error.message)));
};
const monthlyLoading = () => ({
  type: ActionTypes.MONTHLY_LOADING
});
const monthlyFailed = (errmess) => ({
  type: ActionTypes.MONTHLY_FAILED,
  payload: errmess
});
const addMonthly = (monthly) => ({
  type: ActionTypes.ADD_MONTHLY,
  payload: monthly
});

// session
export const fetchSession = () => (dispatch) => {
  dispatch(sessionLoading());
  return fetch(`${BASE_URL}/api/get/session-subscriptions`)
    .then((response) => {
      if (!response.ok) throw Error('Error ' + response.status + ': ' + response.statusText);
      else return response.json();
    })
    .then((session) => dispatch(addSession(session)))
    .catch((error) => dispatch(sessionFailed(error.message)));
};
const sessionLoading = () => ({
  type: ActionTypes.SESSION_LOADING
});
const sessionFailed = (errmess) => ({
  type: ActionTypes.SESSION_FAILED,
  payload: errmess
});
const addSession = (session) => ({
  type: ActionTypes.ADD_SESSION,
  payload: session
});
// trainer
export const fetchTrainer = () => (dispatch) => {
  dispatch(trainerLoading());
  return fetch(`${BASE_URL}/api/get/trainers`)
    .then((response) => {
      if (!response.ok) throw Error('Error ' + response.status + ': ' + response.statusText);
      else return response.json();
    })
    .then((trainer) => dispatch(addTainer(trainer)))
    .catch((error) => dispatch(trainerFailed(error.message)));
};
const trainerLoading = () => ({
  type: ActionTypes.TRAINER_LOADING
});
const trainerFailed = (errmess) => ({
  type: ActionTypes.TRAINER_FAILED,
  payload: errmess
});
const addTainer = (trainer) => ({
  type: ActionTypes.ADD_TRAINER,
  payload: trainer
});
// cart

// export const addToCart = (item) => ({
//   type: ActionTypes.ADD_TO_CART,
//   payload: {
//     id: item.id,
//     name: item.name,
//     price: item.price,
//     type: item.type
//   }
// });
export const addToCart = (item) => async (dispatch, getState) => {
  const { customerId, cartItems } = getState().cart;
  
  if (!customerId) {
    return dispatch({
      type: ActionTypes.ADD_TO_CART_FAILURE,
      payload: 'Customer ID is missing'
    });
  }

  try {
    const response = await axios.get(`${BASE_URL}/api/get/customerBills/${customerId}`);
    const bills = response.data;
    const now = moment();

    const isConflicting = bills.some(bill => {
      const startDate = moment(bill.StartDate);
      const endDate = moment(bill.EndDate);

      return startDate.isBefore(now) && endDate.isAfter(now) && bill.Type === item.type;
    });

    if (isConflicting) {
      return dispatch({
        type: ActionTypes.ADD_TO_CART_FAILURE,
        payload: `You already have an active ${item.type} package`
      });
    }
    const hasMonthly = cartItems.some(cartItem => cartItem.type === 'monthly');
    const hasSession = cartItems.some(cartItem => cartItem.type === 'session');

    if ((item.type === 'monthly' && hasSession) || (item.type === 'session' && hasMonthly)) {
      return dispatch({ type: ActionTypes.ADD_TO_CART_FAILURE, payload: 'Cannot add both monthly and session items to the cart' });
    }
    dispatch({
      type: ActionTypes.ADD_TO_CART,
      payload: {
        id: item.id,
        name: item.name,
        price: item.price,
        type: item.type
      }
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // If customerId not found in bills, allow to add item to cart
      const hasMonthly = cartItems.some(cartItem => cartItem.type === 'monthly');
      const hasSession = cartItems.some(cartItem => cartItem.type === 'session');

      if ((item.type === 'monthly' && hasSession) || (item.type === 'session' && hasMonthly)) {
        return dispatch({ type: ActionTypes.ADD_TO_CART_FAILURE, payload: 'Cannot add both monthly and session items to the cart' });
      }

      dispatch({
        type: ActionTypes.ADD_TO_CART,
        payload: {
          id: item.id,
          name: item.name,
          price: item.price,
          type: item.type
        }
      });
    } else {
      dispatch({
        type: ActionTypes.ADD_TO_CART_FAILURE,
        payload: `Failed to add item to cart: ${error.message}`
      });
    }
  }
};
export const removeFromCart = (id, type) => ({
  type: ActionTypes.REMOVE_FROM_CART,
  payload: { id, type }
});
// payment
export const processPayment = (paymentData) => async (dispatch, getState) => {
  dispatch({ type: ActionTypes.PROCESS_PAYMENT });

  const { CustomerID, MonthlySubscriptionID, SessionSubscriptionID } = paymentData;

  try {
    // Lấy danh sách hóa đơn cũ
    let bills = [];
    try {
      const response = await axios.get(`${BASE_URL}/api/get/customerBills/${CustomerID}`);
      bills = response.data;
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.log('No bills found for customer. Proceeding with payment.');
      } else {
        throw err;
      }
    }

    const now = moment();
    const hasActiveMonthlyBill = bills.some(bill => {
      if (bill.MonthlySubscriptionID) {
        const startDate = moment(bill.StartDate);
        const endDate = moment(bill.EndDate);
        return startDate.isBefore(now) && endDate.isAfter(now);
      }
      return false;
    });

    const hasActiveSessionBill = bills.some(bill => {
      if (bill.SessionSubscriptionID) {
        // Add any necessary conditions to determine if there are active session bills
        return true; // Or some condition to check if there are active sessions
      }
      return false;
    });

    if (hasActiveMonthlyBill) {
      return dispatch({
        type: ActionTypes.PROCESS_PAYMENT_FAILURE,
        payload: 'You have an active monthly subscription and cannot make a new payment until it expires.'
      });
    }

    if (hasActiveSessionBill) {
      return dispatch({
        type: ActionTypes.PROCESS_PAYMENT_FAILURE,
        payload: 'You have remaining sessions and cannot make a new payment until all sessions are used.'
      });
    }

    // Thực hiện thanh toán mới
    let newStartDate = moment().format('YYYY-MM-DD');
    let newEndDate = null;

    if (MonthlySubscriptionID) {
      // Lấy thông tin gói monthly từ API hoặc từ Redux store
      let duration = 0;
      try {
        const response = await axios.get(`${BASE_URL}/api/get/MonthlySubscription/${MonthlySubscriptionID}`);
        duration = response.data.Duration;
      } catch (error) {
        throw new Error('Failed to fetch monthly subscription details.');
      }

      newEndDate = moment().add(duration, 'days').format('YYYY-MM-DD');
    } else if (SessionSubscriptionID) {
      newEndDate = moment().add(6, 'months').format('YYYY-MM-DD');
    }

    const payload = {
      ...paymentData,
      StartDate: newStartDate,
      EndDate: newEndDate
    };

    console.log('Payload to be sent to API:', payload); // Log payload

    const paymentResponse = await axios.post(`${BASE_URL}/api/post/Bill`, payload);

    dispatch({ 
      type: ActionTypes.PROCESS_PAYMENT_SUCCESS, 
      payload: {
        ...paymentResponse.data,
        StartDate: newStartDate,
        EndDate: newEndDate
      }
    });
  } catch (error) {
    console.error('Error processing payment:', error.message);
    dispatch({
      type: ActionTypes.PROCESS_PAYMENT_FAILURE,
      payload: error.message
    });
  }
};


export const logout = () => ({
  type: ActionTypes.LOGOUT
});


export const fetchBills = () => (dispatch) => {
  dispatch(billsLoading());
  return fetch(`${BASE_URL}/api/get/Bills`)
    .then((response) => {
      console.log(response);
      if (!response.ok) throw Error('Error ' + response.status + ': ' + response.statusText);
      else return response.json();
    })
    .then((bills) => {
      console.log(bills); 
      dispatch(addBills(bills))
    })
    .catch((error) => dispatch(billsFailed(error.message)));
};
const billsLoading = () => ({
  type: ActionTypes.BILLS_LOADING
});
const billsFailed = (errmess) => ({
  type: ActionTypes.BILLS_FAILED,
  payload: errmess
});
const addBills = (bills) => ({
  type: ActionTypes.ADD_BILLS,
  payload: bills
});

export const setBillType = (billType) => ({
  type: ActionTypes.SET_BILL_TYPE,
  payload: billType
});
// customer
export const setCustomerId = (customerId) => ({
  type: ActionTypes.SET_CUSTOMER_ID,
  payload: customerId
});
export const fetchCustomers = () => (dispatch) => {
  dispatch(customersLoading());
  return axios.get(`${BASE_URL}/api/get/customers`)
    .then(response => response.data)
    .then(customers => dispatch(addCustomers(customers)))
    .catch(error => dispatch(customersFailed(error.message)));
};

const customersLoading = () => ({
  type: ActionTypes.CUSTOMER_LOADING
});

const customersFailed = (errmess) => ({
  type: ActionTypes.CUSTOMER_FAILED,
  payload: errmess
});

const addCustomers = (customer) => ({
  type: ActionTypes.ADD_CUSTOMER,
  payload: customer
});
// Attendance
export const addAttendance = (billId) => async (dispatch) => {
  dispatch({ type: ActionTypes.ADD_ATTENDANCE_REQUEST });

  try {
    const checkInTime = moment.tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss');
    const response = await axios.post(`${BASE_URL}/api/post/attendance`, {
      BillID: billId,
      CheckInTime: checkInTime
    });

    dispatch({
      type: ActionTypes.ADD_ATTENDANCE_SUCCESS,
      payload: response.data
    });

    // Fetch the latest attendances after adding new attendance
    dispatch(fetchAttendances());
  } catch (error) {
    dispatch({
      type: ActionTypes.ADD_ATTENDANCE_FAILURE,
      payload: error.message
    });
  }
};


export const fetchAttendances = () => async (dispatch) => {
  dispatch({ type: ActionTypes.FETCH_ATTENDANCES_REQUEST });
 
  try {
    const response = await axios.get(`${BASE_URL}/api/get/attendance`);
    dispatch({ type: ActionTypes.FETCH_ATTENDANCES_SUCCESS, payload: response.data });
    console.log("Fetched attendances:", response.data); // Kiểm tra dữ liệu trả về
  } catch (error) {
    dispatch({ type: ActionTypes.FETCH_ATTENDANCES_FAILURE, payload: error.message });
  }
};
export const fetchAttendancesByBillId = (billId) => async (dispatch) => {
  dispatch({ type: ActionTypes.FETCH_ATTENDANCES_BY_BILL_ID_REQUEST });
  try {
    const response = await axios.get(`/api/get/attendance/${billId}`);
    dispatch({
      type: ActionTypes.FETCH_ATTENDANCES_BY_BILL_ID_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: ActionTypes.FETCH_ATTENDANCES_BY_BILL_ID_FAILURE,
      payload: error.message
    });
  }
};