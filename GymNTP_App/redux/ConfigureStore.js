// redux
import { createStore, combineReducers, applyMiddleware} from 'redux';
//import thunk from 'redux-thunk'; // for version 2.x
const thunk = require('redux-thunk').thunk; // for version 3.x
import logger from 'redux-logger';
// reducers
import { monthly } from './monthly';
import {session} from './session';
import {trainer} from './trainer';
import { cartReducer } from './cart';
import { bills } from './payment';
import { customer } from './customer';
import { billReducer } from './billReducer';
import { attendanceReducer } from './attendance';
import { billType } from './billType';
export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({ monthly, 
      session, 
      trainer, 
      cart: cartReducer, 
      bills, 
      customer, 
      billReducer, 
      attendance: attendanceReducer,
      billType
    }),
    applyMiddleware(thunk, logger)
  );
  return store;
};