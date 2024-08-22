import React, { useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import moment from 'moment';
import { connect } from 'react-redux';
import { processPayment, fetchBills } from '../redux/ActionCreators';

const PaymentComponent = ({
  cartItems,
  totalCost,
  customerId,
  processPayment,
  paymentStatus,
  paymentError,
  addToCartError,
  customer,
  navigation,
  billDetails, // Nhận billDetails từ Redux store
  fetchBills
}) => {
  useEffect(() => {
    if (paymentStatus === 'success') {
      Alert.alert('Success', 'Payment processed successfully', [
        { text: 'OK', onPress: () => {
            // Fetch new bills after successful payment
            fetchBills(customerId);
            navigation.navigate('MainScreen');
          }
        }
      ]);
    } else if (paymentStatus === 'failure') {
      Alert.alert('Error', paymentError);
    }
  }, [paymentStatus, paymentError]);

  useEffect(() => {
    if (addToCartError) {
      Alert.alert('Error', addToCartError);
    }
  }, [addToCartError]);

  const handlePayment = () => {
    const trainerId = cartItems.find(item => item.type === 'trainer')?.id || null;
    const monthlySubscriptionId = cartItems.find(item => item.type === 'monthly')?.id || null;
    const sessionSubscriptionId = cartItems.find(item => item.type === 'session')?.id || null;

    const paymentData = {
      CustomerID: customerId,
      EmployeeID: null,
      TrainerID: trainerId,
      MonthlySubscriptionID: monthlySubscriptionId,
      SessionSubscriptionID: sessionSubscriptionId,
      TotalBill: totalCost,
    };

    console.log('Sending payment data:', paymentData);
    processPayment(paymentData);
  };

  const currentCustomer = customer.find(c => c.CustomerID === customerId);
  const customerName = currentCustomer ? currentCustomer.CusName : 'Unknown';

  return (
    <View style={styles.container}>
      <View style={{width:'20%'}}>
      <Button
        title="Go Back"
        onPress={() => navigation.goBack()}
        buttonStyle={styles.goBackButton}
        titleStyle={styles.goBackButtonText}
      />
      </View>
      
      <Text style={styles.title}>Payment Details</Text>
      <Card containerStyle={styles.cardContainer}>
        <Text>User: {customerName}</Text>
        <Text style={styles.sectionTitle}>Items in Cart:</Text>
        {cartItems.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <Text>{item.name}</Text>
            <Text>{item.price} VNĐ</Text>
          </View>
        ))}
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total Cost: {totalCost} VNĐ</Text>
        </View>
      </Card>

      <Button title="Process Payment" onPress={handlePayment} />

      {billDetails && (
        <Card containerStyle={styles.cardContainer}>
          <Text style={styles.sectionTitle}>Bill Details:</Text>
          {billDetails.MonthlySubscriptionID && (
            <Text>Ends on: {moment(billDetails.EndDate).format('YYYY-MM-DD')}</Text>
          )}
          {billDetails.SessionSubscriptionID && (
            <Text>Session Subscription ID: {billDetails.SessionSubscriptionID}</Text>
          )}
        </Card>
      )}
    </View>
  );
};

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
  totalCost: state.cart.totalCost,
  customerId: state.cart.customerId,
  paymentStatus: state.cart.paymentStatus,
  paymentError: state.cart.paymentError,
  addToCartError: state.cart.addToCartError,
  customer: state.customer.customer,
  billDetails: state.bills.billDetails
});

const mapDispatchToProps = {
  processPayment,
  fetchBills
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cardContainer: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  totalContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  goBackButton: {
    marginTop: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
    fontWeight:10
  },
  goBackButtonText: {
    fontSize: 10,
  },
});
