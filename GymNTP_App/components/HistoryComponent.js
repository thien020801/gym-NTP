import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { ListItem, Card } from 'react-native-elements';
import moment from 'moment-timezone';

// redux
import { connect } from 'react-redux';
import { bills } from '../redux/payment';
import { customer } from '../redux/customer';
import { monthly } from '../redux/monthly';
import { session } from '../redux/session';
import {trainer} from '../redux/trainer';
const mapStateToProps = (state) => {
  return {
    bills: state.bills.bills,
    isLoading: state.bills.isLoading,
    errMess: state.bills.errMess,
    customerId: state.cart.customerId,
    customers: state.customer.customer, // Assuming customer reducer returns an array of customers
    monthlys: state.monthly.monthly,
    sessions: state.session.session,
    trainers: state.trainer.trainer
  };
};

class History extends Component {
  renderBills = ({ item }) => {
    const { customers, monthlys, sessions, trainers  } = this.props;
    const customer = customers.find(c => c.CustomerID === item.CustomerID);
    const customerName = customer ? customer.CusName : 'Unknown';

    let subscriptionName = 'N/A';

    if(item.MonthlySubscriptionID){
      const monthly = monthlys.find(ms => ms.MonthlySubscriptionID === item.MonthlySubscriptionID);
      subscriptionName  = monthly ? monthly.Name : 'N/A';
  
    }else if(item.SessionSubscriptionID){
      const session = sessions.find(ss => ss.SessionSubscriptionID === item.SessionSubscriptionID);
      subscriptionName  = session ? session.Name : 'N/A';
    }

    const trainer = trainers.find(t => t.TrainerID === item.TrainerID);
    const trainerName = trainer ? trainer.TrainerName : 'N/A';

    const formattedStartDate = moment.tz(item.StartDate, 'Asia/Ho_Chi_Minh').format('DD-MM-YYYY');
    const formattedEndDate = moment.tz(item.EndDate, 'Asia/Ho_Chi_Minh').format('DD-MM-YYYY');
    return (
      <Card containerStyle={{ marginBottom: 10 }}>
        <ListItem.Content>
          <ListItem.Title>
            <Text>Customer Name: {customerName}</Text>
          </ListItem.Title>
          <ListItem.Subtitle>
            <Text>Trainer: {trainerName}</Text>
          </ListItem.Subtitle>
          <ListItem.Subtitle>
            <Text>Subscription Packages: {subscriptionName}</Text>
          </ListItem.Subtitle>
          <ListItem.Subtitle>
            <Text>Duration: {formattedStartDate} - {formattedEndDate}</Text>
          </ListItem.Subtitle>
          <ListItem.Subtitle>
            <Text>Total Price: {item.TotalBill} VND</Text>
          </ListItem.Subtitle>
        </ListItem.Content>
      </Card>
    );
  };

  render() {
    const { bills, isLoading, errMess, customerId } = this.props;

    if (isLoading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (errMess) {
      return <Text>{errMess}</Text>;
    }

    if (!bills || bills.length === 0) {
      return <Text>No bills available.</Text>;
    }

    const filteredBills = bills.filter(bill => bill.CustomerID === customerId);

    if (!filteredBills || filteredBills.length === 0) {
      return <Text>No bills available for this customer.</Text>;
    }

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ paddingHorizontal: 10 }}
          data={filteredBills}
          renderItem={this.renderBills}
          keyExtractor={(item) => item.BillID.toString()}
        />
      </View>
    );
  }
}

export default connect(mapStateToProps)(History);
