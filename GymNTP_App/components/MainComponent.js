import React, { Component } from 'react';
import { View, Text, Linking, StyleSheet } from 'react-native';
import { Icon, Image, Card } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Login from './LoginComponent';
import SignUp from './SignUpComponent';
import Home from './HomeComponent';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Profile from './ProfileComponent';
import History from './HistoryComponent';
import Cart from './CartComponent';
import Payment from './PaymentComponent';
function HomeNavigatorScreen() {
  const HomeNavigator = createStackNavigator();
  return (
    <HomeNavigator.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <HomeNavigator.Screen name='Home' component={Home}
        options={({ navigation }) => ({
          headerTitle: 'Home',
          headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
    </HomeNavigator.Navigator>
  );
}
function ProfileNavigatorScreen() {
  const ProfileNavigator = createStackNavigator();
  return (
    <ProfileNavigator.Navigator
      initialRouteName='Profile'
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <ProfileNavigator.Screen name='Profile' component={Profile}
        options={({ navigation }) => ({
          headerTitle: 'Profile',
          headerLeft: () => (<Icon name='person' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
    </ProfileNavigator.Navigator>
  );
}
function HistoryNavigatorScreen() {
  const HistoryNavigator = createStackNavigator();
  return (
    <HistoryNavigator.Navigator
      initialRouteName='History'
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <HistoryNavigator.Screen name='Profile' component={History}
        options={({ navigation }) => ({
          headerTitle: 'History',
          headerLeft: () => (<Icon name='history' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
    </HistoryNavigator.Navigator>
  );
}
function AttendanceNavigatorScreen() {
  const AttendanceNavigator = createStackNavigator();
  return (
    <AttendanceNavigator.Navigator
      initialRouteName='Attendance'
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <AttendanceNavigator.Screen name='Attendance' component={Attendance}
        options={({ navigation }) => ({
          headerTitle: 'Attendance',
          headerLeft: () => (<Icon name='checklist' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
    </AttendanceNavigator.Navigator>
  );
}
function DashboardNavigatorScreen() {
  const DashboardNavigator = createStackNavigator();
  return (
    <DashboardNavigator.Navigator
      initialRouteName='Dashboard'
      screenOptions={{
        headerShown: false
      }}>
      <DashboardNavigator.Screen name='Dashboard' component={Dashboard}
        options={({ navigation }) => ({
          headerShown: false
          
        })} />
    </DashboardNavigator.Navigator>
  );
}
function LoginNavigatorScreen() {
  const LoginNavigator = createStackNavigator();
  return (
    <LoginNavigator.Navigator
      initialRouteName='Login'
      screenOptions={{
        headerShown: false
      }}>
      <LoginNavigator.Screen name='Login' component={Login} />
      <LoginNavigator.Screen name='SignUp' component={SignUp} />
      <LoginNavigator.Screen name='Home' component={Home} />
      <LoginNavigator.Screen name='MainScreen' component={MainNavigatorScreen} />
    </LoginNavigator.Navigator>
  );
}
function CartNavigatorScreen() {
  const LoginNavigator = createStackNavigator();
  return (
    <LoginNavigator.Navigator
      initialRouteName='CartMain'
      screenOptions={{
        headerShown: false
      }}>
      <LoginNavigator.Screen name='CartMain' component={Cart} />
      <LoginNavigator.Screen name='Payment' component={Payment} />
      <LoginNavigator.Screen name='MainScreen' component={MainNavigatorScreen} />
    </LoginNavigator.Navigator>
  );
}
import { useDispatch } from 'react-redux';
import { logout } from '../redux/ActionCreators';
import { APP_TITLE } from '../constants';

function CustomDrawerContent(props) {
  const { navigation } = props;
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate('loginScreen');
  };
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ backgroundColor: '#7cc', height: 80, alignItems: 'center', flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <Image source={require('./images/Logo.jpg')} style={{ margin: 10, width: 80, height: 60, borderRadius: 15 }} />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={{ color: '#fff', fontSize: 22, fontWeight: 'bold' }}>{APP_TITLE}</Text>
        </View>
      </View>
      <DrawerItemList {...props} />
      <View style={styles.divider}></View>
      <DrawerItem label='Logout'
        icon={({ focused, color, size }) => <Icon name='logout' size={size} color={focused ? '#7cc' : '#ccc'} />}
        onPress={handleLogout} />

    </DrawerContentScrollView>
  );
}
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Dashboard from './DashboardComponent';
import Package from './PackageComponent';
import Trainer from './TrainerComponent';
//Screen names

const Tab = createBottomTabNavigator();

function MainBottomTab() {
  const iconNames = {
    DashboardTab : 'analytics',
    Package: 'list',
    Trainer: 'directions-run',
    Payment: 'credit-card', // Sử dụng icon credit-card cho màn hình Payment
    Cart: 'shopping-cart', // Sử dụng icon shopping-cart cho màn hình Cart
  };

  return (
    <Tab.Navigator
      initialRouteName="DashboardTab"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = iconNames[route.name];
          return (
            <Icon
              name={focused ? iconName : iconName}
              type="material" // Type của Icon (ví dụ: material, ionicon, font-awesome)
              size={size}
              color={color}
            />
          );
        },
        activeTintColor: 'tomato',
        inactiveTintColor: 'grey',
        labelStyle: { fontSize: 12, fontWeight: 'bold' },
        style: { padding: 10, height: 70, backgroundColor: 'white' }
      })}
    >
      <Tab.Screen name="DashboardTab" component={DashboardNavigatorScreen} options={{title: 'Dashboard', headerShown: false }}/>
      <Tab.Screen name="Package" component={Package} options={{ headerShown: false }} />
      <Tab.Screen name="Trainer" component={Trainer} options={{ headerShown: false }} />
      {/* <Tab.Screen name="Payment" component={Payment} options={{ headerShown: false }} /> */}
      <Tab.Screen name="Cart" component={CartNavigatorScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}
import Attendance from './AttendanceComponent';
function MainNavigatorScreen() {
  const MainNavigator = createDrawerNavigator();
  return (
    <MainNavigator.Navigator initialRouteName='HomeScreen' drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <MainNavigator.Screen name='HomeScreen' component={HomeNavigatorScreen}
        options={{
          title: 'Home', headerShown: false,
          drawerIcon: ({ focused, size }) => (<Icon name='home' size={size} color={focused ? '#7cc' : '#ccc'} />)
        }} />
      <MainNavigator.Screen name='ProfileScreen' component={ProfileNavigatorScreen}
        options={{
          title: 'Profile', headerShown: false,
          drawerIcon: ({ focused, size }) => (<Icon name='person' size={size} color={focused ? '#7cc' : '#ccc'} />)
        }} />
      <MainNavigator.Screen name='History' component={HistoryNavigatorScreen}
        options={{
          title: 'History', headerShown: false,
          drawerIcon: ({ focused, size }) => (<Icon name='history' size={size} color={focused ? '#7cc' : '#ccc'} />)
        }} />
      <MainNavigator.Screen name='AttendanceDrawer' component={AttendanceNavigatorScreen}
        options={{
          title: 'Attendance', headerShown: false,
          drawerIcon: ({ focused, size }) => (<Icon name='checklist' size={size} color={focused ? '#7cc' : '#ccc'} />)
        }} />
      <MainNavigator.Screen
        name='tabScreen'
        component={MainBottomTab}
        options={{
          title: 'Tabs',
          drawerIcon: ({ focused, size }) => (
            <Icon name='apps' size={size} color={focused ? '#7cc' : '#ccc'} />
          ),
        }}
      />

      <MainNavigator.Screen name='loginScreen' component={LoginNavigatorScreen}
        options={{
          headerShown: false,
          drawerIcon: ({ focused, size }) => (<Icon name='login' size={size} color={focused ? '#7cc' : '#ccc'} />)
        }} />
    </MainNavigator.Navigator>
  );
}
// redux
import { connect } from 'react-redux';
import { fetchMonthly, fetchSession, fetchTrainer, fetchBills, fetchCustomers, fetchAttendances} from '../redux/ActionCreators';
const mapDispatchToProps = (dispatch) => ({
  fetchMonthly: () => dispatch(fetchMonthly()),
  fetchSession: () => dispatch(fetchSession()),
  fetchTrainer: () => dispatch(fetchTrainer()),
  fetchBills: () => dispatch(fetchBills()),
  fetchCustomers: () => dispatch(fetchCustomers()),
  fetchAttendances: () => dispatch(fetchAttendances())
});

class Main extends Component {
  render() {
    return (
      <NavigationContainer>
        <MainNavigatorScreen />
      </NavigationContainer>
    );
  }
  componentDidMount() {
    // redux
    this.props.fetchMonthly();
    this.props.fetchSession();
    this.props.fetchTrainer();
    this.props.fetchBills();
    this.props.fetchCustomers();
    this.props.fetchAttendances();
  }
}
export default connect(null, mapDispatchToProps)(Main);
const styles = StyleSheet.create({
  cardContainer: {
    // Các kiểu CSS của container thẻ Card
  },
  divider: {
    height: 2, // Độ cao của phân cách
    backgroundColor: '#1A84D3', // Màu sắc của phân cách
    marginVertical: 10, // Khoảng cách dọc từ trên xuống dưới
  },
});