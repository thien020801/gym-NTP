import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { Card } from 'react-native-elements'; // Import Card from react-native-elements
import { connect } from 'react-redux';
import { removeFromCart } from '../redux/ActionCreators'; // Update with the correct path

const Cart = ({ cartItems, totalCost, removeFromCart, customerId, navigation, addToCartError, customer }) => {
  const renderItem = ({ item }) => (
    <Card containerStyle={styles.cardContainer}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{item.name} - {item.price}{'\u00A0'}VNĐ</Text>
        <Button title="Remove" onPress={() => removeFromCart(item.id, item.type)} />
      </View>
    </Card>
  );

  const handleCheckout = () => {
    if (!customerId) {
      Alert.alert('Please log in to proceed to checkout');
      return;
    }
    navigation.navigate('Payment');
  };

  const currentCustomer = customer.find(c => c.CustomerID === customerId);
  const customerName = currentCustomer ? currentCustomer.CusName : 'Unknown';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      {customerId ? (
        <Text>User: {customerName}</Text>
      ) : (
        <Text style={styles.errorText}>You are not logged in</Text>
      )}
      {addToCartError && <Text style={styles.errorText}>{addToCartError}</Text>}
      {cartItems.length > 0 ? (
        <View>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => `${item.type}-${item.id}`}
          />
          <Button title="Checkout" onPress={handleCheckout} />
        </View>
      ) : (
        <Text>Your cart is empty</Text>
      )}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total Cost: {totalCost} VNĐ</Text>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  cartItems: state.cart.cartItems,
  totalCost: state.cart.totalCost,
  customerId: state.cart.customerId,
  addToCartError: state.cart.addToCartError,
  customer: state.customer.customer
});

const mapDispatchToProps = dispatch => ({
  removeFromCart: (id, type) => dispatch(removeFromCart(id, type))
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },
  cardContainer: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 10, // Rounded corners for the card
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 1 }, // Shadow offset for iOS
    shadowOpacity: 0.8, // Shadow opacity for iOS
    shadowRadius: 2, // Shadow radius for iOS
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 18
  },
  totalContainer: {
    marginTop: 16
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 16
  }
});
