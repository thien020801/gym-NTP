import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Card, Button } from 'react-native-elements';
import MonthlySubscriptions from './MonthlySubscriptionsComponent';
import MonthlyDetail from './MonthlyDetailComponent';
import SessionSubscriptions from './SessionSubscriptionsComponent';
import SessionDetail from './SessionDetailComponent';
import Payment from './PaymentComponent';

const Stack = createStackNavigator();

const PackageScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Please select one of the subscription options below to proceed:</Text>
      <Card containerStyle={styles.card}>
        <Button
          title="Go to Monthly Subscriptions"
          buttonStyle={styles.button}
          onPress={() => navigation.navigate('MonthlySubscriptions')}
        />
        <Text style={styles.orText}>Or</Text>
        <Button
          title="Go to Session Subscriptions"
          buttonStyle={styles.button}
          onPress={() => navigation.navigate('SessionSubscriptions')}
        />
      </Card>
    </View>
  );
};

function MonthlyNavigatorScreen() {
  const MonthlyNavigator = createStackNavigator();
  return (
    <MonthlyNavigator.Navigator
      initialRouteName='Monthly'
      screenOptions={styles.navigatorScreenOptions}
    >
      <MonthlyNavigator.Screen name='Monthly' component={MonthlySubscriptions} />
      <MonthlyNavigator.Screen name='MonthlyDetail' component={MonthlyDetail} options={{ headerTitle: 'Monthly Detail' }} />
      <MonthlyNavigator.Screen name='Payment' component={Payment} options={{ headerTitle: 'Payment' }} />
    </MonthlyNavigator.Navigator>
  );
}

function SessionNavigatorScreen() {
  const SessionNavigator = createStackNavigator();
  return (
    <SessionNavigator.Navigator
      initialRouteName='Session'
      screenOptions={styles.navigatorScreenOptions}
    >
      <SessionNavigator.Screen name='Session' component={SessionSubscriptions} />
      <SessionNavigator.Screen name='SessionDetail' component={SessionDetail} options={{ headerTitle: 'Session Detail' }} />
      <SessionNavigator.Screen name='Payment' component={Payment} options={{ headerTitle: 'Payment' }} />
    </SessionNavigator.Navigator>
  );
}

function Package() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="PackageScreen">
        <Stack.Screen name="PackageScreen" component={PackageScreen} options={{ title: 'Package', headerShown: false }} />
        <Stack.Screen name="MonthlySubscriptions" component={MonthlyNavigatorScreen} options={{ title: 'Monthly Subscriptions', headerShown: false }} />
        <Stack.Screen name="SessionSubscriptions" component={SessionNavigatorScreen} options={{ title: 'Session Subscriptions', headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Package;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    margin: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    width: '90%',
    borderRadius: 10,
    padding: 20,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    marginVertical: 10,
  },
  orText: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 16,
    color: '#666',
  },
  navigatorScreenOptions: {
    headerStyle: { backgroundColor: '#007bff' },
    headerTintColor: '#fff',
    headerTitleStyle: { color: '#fff' },
  },
});
