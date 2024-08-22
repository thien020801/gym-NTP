import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-elements';
import axios from 'axios';

class RenderSession extends Component {
  handleChooseSession = () => {
    const { session, addToCart, customerId, cartItems } = this.props;
    const hasMonthly = cartItems.some(item => item.type === 'monthly');
    if (hasMonthly) {
      Alert.alert("Error", "Cannot add a session package when a monthly package is already in the cart");
      return;
    }
    if (!customerId) {
      Alert.alert("Error", "You must be logged in to add items to the cart");
      return;
    }

    const existingItem = cartItems.find(item => item.type === 'session');
    if (existingItem) {
      Alert.alert("Error", "You already have a session package in your cart");
      return;
    }
    try {
      addToCart({
        id: session.SessionSubscriptionID,
        name: session.Name,
        price: session.Cost,
        type: 'session'
      });
      Alert.alert("Success", "Selected successfully");
    } catch (error) {
      Alert.alert("Failure", "The selection process failed");
      console.log(error);
    }
  };
  render() {
    const { session, addToCartError } = this.props;
    if (session != null) {
      return (
        <View style={styles.container}>
          <Card containerStyle={styles.card}>
            <Text style={styles.title}>Session Page</Text>
            <Text>Subscription Name: {session.Name}</Text>
            <Text>Cost: {session.Cost}</Text>
            <Text>Number Of Sessions: {session.NumberOfSessions}</Text>
            {addToCartError && <Text style={styles.errorText}>{addToCartError}</Text>}
            <Button
              title="Choose"
              onPress={() => {
                Alert.alert(
                  'Add to cart?',
                  `Are you sure you want to add to cart this session package: ${session.Name}?`,
                  [
                    { text: 'Cancel', onPress: () => { } },
                    { text: 'OK', onPress: () => this.handleChooseSession() }
                  ]
                );
              }}
              buttonStyle={styles.button}
            />
          </Card>
        </View>
      );
    }
    return (<View />);
  }
}
// redux
import { connect } from 'react-redux';
import { session } from '../redux/session';
const mapStateToProps = (state) => {
  return {
    session: state.session,
    customerId: state.cart.customerId,
    cartItems: state.cart.cartItems,
    addToCartError: state.cart.addToCartError
  }
};
import { addToCart } from '../redux/ActionCreators';

const mapDispatchToProps = (dispatch) => ({
  addToCart: (item) => dispatch(addToCart(item))
});

class SessionDetail extends Component {
  render() {
    const sessionId = parseInt(this.props.route.params.sessionId); // chuyển về số nguyên từ dữ liệu lấy trong csdl
    const session = this.props.session.session.find(item => item.SessionSubscriptionID === sessionId);

    return (
      <RenderSession session={session} addToCart={this.props.addToCart} customerId={this.props.customerId} cartItems={this.props.cartItems} />
    );
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(SessionDetail);

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