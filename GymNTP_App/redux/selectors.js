import { createSelector } from 'reselect';

// Input selectors
const getBills = state => state.bills.bills || [];
const getCustomerId = (state, props) => state.cart.customerId; 

// Memoized selector
export const getCustomerBills = createSelector(
  [getBills, getCustomerId],
  (bills, customerId) => {
    console.log('Bills in selector:', bills);
    console.log('Customer ID in selector:', customerId);
    return bills.filter(bill => bill.CustomerID === customerId);
  }
);
