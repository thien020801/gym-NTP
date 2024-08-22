import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-elements';
class RenderMonthly extends Component {
  handleChooseMonthly = () => {
    const { monthly, addToCart, customerId, cartItems } = this.props;
    const hasSession = cartItems.some(item => item.type === 'session');
    if (hasSession) {
      Alert.alert("Error", "Cannot add a monthly package when a session package is already in the cart");
      return;
    }
    if (!customerId) {
      Alert.alert("Error", "You must be logged in to add items to the cart");
      return;
    }

    // Kiểm tra xem item cùng loại đã tồn tại trong giỏ hàng chưa
    const existingItem = cartItems.find(item => item.type === 'monthly');
    if (existingItem) {
      Alert.alert("Error", "You already have a monthly package in your cart");
      return;
    }

    try {
      addToCart({
        id: monthly.MonthlySubscriptionID,
        name: monthly.Name,
        price: monthly.Cost,
        type: 'monthly'
      });
      Alert.alert("Success", "Selected successfully");
    } catch (error) {
      Alert.alert("Failure", "The selection process failed");
      console.log(error);
    }
  };
  render() {
    const { monthly, addToCartError } = this.props;
    if (monthly != null) {
      return (
        <View style={styles.container}>
          <Card containerStyle={styles.card}>
          <Text>Payment Page</Text>
          <Text>Subscription Name: {monthly.Name}</Text>
          <Text>Cost: {monthly.Cost}</Text>
          <Text>Duration: {monthly.Duration}</Text>
          {addToCartError && <Text style={{ color: 'red' }}>{addToCartError}</Text>}
          <Button title="Choose" onPress={() => {
            Alert.alert(
              'Add to cart?',
              `Are you sure you want to add to cart this month package: ${monthly.Name}?`,
              [
                { text: 'Cancel', onPress: () => { /* nothing */ } },
                { text: 'OK', onPress: () => this.handleChooseMonthly() }
              ]
            );
          }}
            buttonStyle={styles.button}
            />
          </Card>
        </View>
        
      );
    }
  return(<View />);
  }
}

// redux
import { connect } from 'react-redux';
import { monthly } from '../redux/monthly';
import { addToCart } from '../redux/ActionCreators';
const mapStateToProps = (state) => {
  return {
    monthly: state.monthly,
    customerId: state.cart.customerId,
    cartItems: state.cart.cartItems,
    addToCartError: state.cart.addToCartError
  }
};
const mapDispatchToProps = (dispatch) => ({
  addToCart: (item) => dispatch(addToCart(item))
});


class MonthlyDetail extends Component {

  render() {

    const monthlyId = parseInt(this.props.route.params.monthlyId); // chuyển về số nguyên từ dữ liệu lấy trong csdl
    const monthly = this.props.monthly.monthly.find(item => item.MonthlySubscriptionID === monthlyId);
    return (
      <RenderMonthly  monthly={monthly} addToCart={this.props.addToCart} customerId={this.props.customerId} cartItems={this.props.cartItems}/>
    );
  }

}
export default connect(mapStateToProps, mapDispatchToProps) (MonthlyDetail);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    width: '80%',
    borderRadius: 10,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    marginTop: 16,
    backgroundColor: '#007bff', // Change button color to blue
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});