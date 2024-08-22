import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { connect } from 'react-redux';
import { fetchAttendancesByBillId } from '../redux/ActionCreators';
import * as ActionTypes from '../redux/ActionTypes';
import moment from 'moment';

const Dashboard = ({ attendances, isLoading, errMess, customerId, bills, sessionSubscriptions, billType, setBillType }) => {
  const [yearlyData, setYearlyData] = useState(Array(12).fill(0));
  const [filteredAttendances, setFilteredAttendances] = useState([]);

  useEffect(() => {
    const customerBills = bills.filter(bill => bill.CustomerID === customerId);
    if (customerBills.length > 0) {
      const latestBill = customerBills.reduce((latest, current) =>
        moment(current.EndDate).isAfter(moment(latest.EndDate)) ? current : latest
      );

      const yearlyData = getYearlyData(attendances, latestBill.BillID);
      setYearlyData(yearlyData);

      const sessionData = getSessionData(attendances, latestBill.BillID);
      setFilteredAttendances(sessionData);

      // Cập nhật loại hóa đơn
      const billType = latestBill.MonthlySubscriptionID ? 'monthly' : 'session';
      setBillType(billType);
    }
  }, [attendances, customerId, bills]);

  const getYearlyData = (attendances, billId) => {
    const currentYear = moment().year();
    const monthlyData = Array(12).fill(0);

    const filteredAttendances = attendances.filter(att => att.BillID === billId && att.CheckInTime !== null);

    filteredAttendances.forEach(att => {
      const checkinTime = moment(att.CheckInTime);
      if (checkinTime.year() === currentYear) {
        const month = checkinTime.month();
        monthlyData[month] += 1;
      }
    });

    return monthlyData;
  };

  const getSessionData = (attendances, billId) => {
    return attendances.filter(att => att.BillID === billId && att.CheckInTime !== null);
  };

  const getNumberOfSessionsForBill = (bill) => {
    const subscription = sessionSubscriptions.find(sub => sub.SessionSubscriptionID === bill.SessionSubscriptionID);
    return subscription ? subscription.NumberOfSessions : 0;
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (errMess) {
    return <Text>Error: {errMess}</Text>;
  }

  const customerBills = bills.filter(bill => bill.CustomerID === customerId);
  const latestBill = customerBills.length > 0 ? customerBills.reduce((latest, current) =>
    moment(current.EndDate).isAfter(moment(latest.EndDate)) ? current : latest
  ) : null;

  const totalSessions = latestBill ? getNumberOfSessionsForBill(latestBill) : 0;
  const completedSessions = filteredAttendances.length;

  const pieChartData = [
    {
      name: 'Completed',
      population: completedSessions,
      color: 'rgba(0, 122, 255, 1)',
      legendFontColor: '#333',
      legendFontSize: 15
    },
    {
      name: 'Remaining',
      population: totalSessions - completedSessions,
      color: '#8bcdd5',
      legendFontColor: '#333',
      legendFontSize: 15
    }
  ];

  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Dashboard</Text>
        {billType === 'monthly' ? (
          <>
            <Text style={styles.chartTitle}>Monthly Attendance</Text>
            <BarChart
              style={styles.barChart}
              data={{
                labels: monthLabels,
                datasets: [{ data: yearlyData }]
              }}
              width={Dimensions.get('window').width - 40}
              height={220}
              chartConfig={chartConfig}
            />
          </>
        ) : (
          <>
            <Text style={styles.chartTitle}>Session Completion</Text>
            <PieChart
              style={styles.chart}
              data={pieChartData}
              width={Dimensions.get('window').width - 40}
              height={220}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
            <Text style={styles.sessionsText}>{completedSessions}/{totalSessions} sessions completed</Text>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  const { attendance, billType, cart, session } = state;
  const attendances = attendance.attendances;
  const isLoading = attendance.isLoading;
  const errMess = attendance.errMess;

  const customerId = cart.customerId;
  const bills = state.bills.bills;
  const sessionSubscriptions = session.session;
  return {
    attendances,
    isLoading,
    errMess,
    billType,
    customerId,
    bills,
    sessionSubscriptions 
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchAttendancesByBillId: (billId) => dispatch(fetchAttendancesByBillId(billId)),
  setBillType: (billType) => dispatch({ type: ActionTypes.SET_BILL_TYPE, payload: billType })
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#007aff'
  },
  chartTitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#333'
  },
  barChart: {
    marginVertical: 8,
    borderRadius: 16
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16
  },
  sessionsText: {
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
    color: '#333'
  }
});

const chartConfig = {
  backgroundGradientFrom: '#e0e0e0',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#ffffff',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
  fillShadowGradient: '#007aff',
  fillShadowGradientOpacity: 1,
  decimalPlaces: 0,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726'
  }
};
