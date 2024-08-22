import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Card, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { addToCart } from '../redux/ActionCreators';

class RenderTrainerDetail extends Component {
  handleChooseTrainer = () => {
    const { trainerDetail, addToCart, customerId, cartItems } = this.props;

    if (!customerId) {
      Alert.alert("Error", "You must be logged in to add items to the cart");
      return;
    }

    const existingItem = cartItems.find(item => item.type === 'trainer');
    if (existingItem) {
      Alert.alert("Error", "You already have a trainer package in your cart");
      return;
    }
    try {
      addToCart({
        id: trainerDetail.TrainerID,
        name: trainerDetail.TrainerName,
        price: trainerDetail.Cost,
        type: 'trainer'
      });
      Alert.alert("Success", "Selected successfully");
    } catch (error) {
      Alert.alert("Failure", "The selection process failed");
      console.log(error);
    }
  };

  render() {
    const { trainerDetail, addToCartError } = this.props;
    if (trainerDetail) {
      return (
        <View style={styles.container}>
      <Card containerStyle={styles.cardContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Trainer Name:</Text>
            <Text style={styles.text}>{trainerDetail.TrainerName}</Text>
            <Text style={styles.label}>Phone Number:</Text>
            <Text style={styles.text}>{trainerDetail.PhoneNumber}</Text>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.text}>{trainerDetail.Address}</Text>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.text}>{trainerDetail.Email}</Text>
            <Text style={styles.label}>Date Of Birth:</Text>
            <Text style={styles.text}>{trainerDetail.DateOfBirth}</Text>
            <Text style={styles.label}>Gender:</Text>
            <Text style={styles.text}>{trainerDetail.Gender}</Text>
            <Text style={styles.label}>Price:</Text>
            <Text style={styles.text}>{trainerDetail.Cost}</Text>
            {addToCartError && <Text style={styles.errorText}>{addToCartError}</Text>}
          </View>
          <Avatar
            rounded
            size="large"
            // source={{ uri: trainerDetail.Image }}
            source={require('./images/Logo.jpg')}
            containerStyle={styles.avatarContainer}
          />
        </View>
      </Card>

      <TouchableOpacity
        style={styles.chooseButton}
        onPress={() => {
          Alert.alert(
            'Add to cart?',
            'Are you sure you want to add to cart this trainer: ' + trainerDetail.TrainerName + '?',
            [
              { text: 'Cancel', onPress: () => { /* nothing */ } },
              { text: 'OK', onPress:() => this.handleChooseTrainer() }
            ]
          );
        }}
      >
        <Text style={styles.chooseButtonText}>Choose</Text>
      </TouchableOpacity>
    </View>
      );
    }
    return (<View />);
  }
}

const mapStateToProps = (state, ownProps) => {
  const trainerId = parseInt(ownProps.route.params.trainerId);
  return {
    trainerDetail: state.trainer.trainer.find(item => item.TrainerID === trainerId),
    customerId: state.cart.customerId,
    cartItems: state.cart.cartItems,
    addToCartError: state.cart.addToCartError
  };
};

const mapDispatchToProps = (dispatch) => ({
  addToCart: (item) => dispatch(addToCart(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(RenderTrainerDetail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
  },
  cardContainer: {
    width: '100%',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    padding: 20,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoContainer: {
    flex: 1,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  chooseButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  chooseButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  avatarContainer: {
    marginLeft: 20,
    marginBottom: 350
  },
});
