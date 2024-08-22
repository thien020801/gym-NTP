import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import moment from 'moment';

class Attendance extends Component {
  handleAttendance = async () => {
    const { customerId, bills, addAttendance, attendances } = this.props;
    const customerBills = bills.filter(bill => bill.CustomerID === customerId);

    if (customerBills.length > 0) {
      const latestBill = customerBills.reduce((latest, current) =>
        moment(current.EndDate).isAfter(moment(latest.EndDate)) ? current : latest
      );

      const today = moment().tz('Asia/Ho_Chi_Minh').startOf('day');
      console.log("Today: ", today.format());
      
      const todayAttendance = attendances.find(attendance =>
        moment.utc(attendance.CheckInTime).subtract(7, 'hours').tz('Asia/Ho_Chi_Minh').startOf('day').isSame(today) && attendance.BillID === latestBill.BillID
      );
      console.log("todayAttendance: ",todayAttendance );
      if (todayAttendance) {
        const checkInTime = moment.utc(todayAttendance.CheckInTime).subtract(7, 'hours').tz('Asia/Ho_Chi_Minh').format('HH:mm:ss');
        console.log("checkInTime: ",checkInTime );
        Alert.alert('Already Checked In', `You have already checked in at ${checkInTime} today.`);
      } else {
        try {
          await addAttendance(latestBill.BillID);
          Alert.alert('Success', 'Attendance confirmed!');
        } catch (error) {
          console.error('Error in addAttendance try block:', error);
          Alert.alert('Error', 'Failed to confirm attendance.');
        }
      }
    } else {
      Alert.alert('Error', 'No active subscription found.');
    }
  };

  calculateRemainingDaysOrSessions = (bill, attendances) => {
    if (bill.MonthlySubscriptionID) {
      const endDate = moment(bill.EndDate);
      const remainingDays = endDate.startOf('day').diff(moment().startOf('day'), 'days');
      return `Remaining days: ${remainingDays}`;
    } else if (bill.SessionSubscriptionID) {
      const sessionsAttended = attendances.filter(a => a.BillID === bill.BillID).length;
      console.log("Sessions attended: ", sessionsAttended);
      return `Sessions attended: ${sessionsAttended}`;
    }
    return '';
  };

  render() {
    const { customerId, customers, bills, attendances, isLoading, errMess } = this.props;

    if (isLoading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (errMess) {
      return <Text>{errMess}</Text>;
    }

    const customerBills = bills.filter(bill => bill.CustomerID === customerId);
    const currentCustomer = customers.find(c => c.CustomerID === customerId);
    const customerName = currentCustomer ? currentCustomer.CusName : 'Unknown';

    if (!customerBills || customerBills.length === 0) {
      return <Text>No active subscriptions found for this customer.</Text>;
    }

    const activeBill = customerBills.reduce((latest, current) =>
      moment(current.EndDate).isAfter(moment(latest.EndDate)) ? current : latest
    );

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Attendance</Text>
        <Text>Customer: {customerName}</Text>
        <Text style={styles.infoText}>{this.calculateRemainingDaysOrSessions(activeBill, attendances)}</Text>
        <Text style={styles.infoText}>
          Duration: {moment(activeBill.StartDate).format('DD/MM/YYYY')} - {moment(activeBill.EndDate).format('DD/MM/YYYY')}
        </Text>
        <TouchableOpacity style={styles.button} onPress={this.handleAttendance}>
          <Text style={styles.buttonText}>Confirm Attendance</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
// redux
import { connect } from 'react-redux';
import { addAttendance} from '../redux/ActionCreators';
import { attendances } from '../redux/attendance';
const mapStateToProps = (state) => ({
  customerId: state.cart.customerId,
  customers: state.customer.customer,
  bills: state.bills.bills,
  attendances: state.attendance.attendances,
  isLoading: state.attendance.isLoading,
  errMess: state.attendance.errMess
});

const mapDispatchToProps = {
  addAttendance
};

export default connect(mapStateToProps, mapDispatchToProps)(Attendance);
