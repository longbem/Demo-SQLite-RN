import React, {Component} from 'react';

//import navigation
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
// icon
import IconAn from 'react-native-vector-icons/AntDesign';

// import screen
import HomeScreen from '../Screen/Home';
import ThongKeScreen from '../Screen/ThongKe';
import TongTienScreen from '../Screen/TongTien';
import SplashScreen from '../Screen/Splash';
import AddCustomerScreen from '../Screen/AddCustomer/index.';
import DetailCustomerScreen from '../Screen/DetailCustomer';
import UpdateCustomerSreen from '../Screen/UpdateCustomer';

// tab bottom
const TabBottom = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({tintColor}) => (
          <IconAn name="home" size={20} color={tintColor} />
        ),
      },
    },
    ThongKe: {
      screen: ThongKeScreen,
      navigationOptions: {
        tabBarLabel: 'Thống kê',
        tabBarIcon: ({tintColor}) => (
          <IconAn name="inbox" size={20} color={tintColor} />
        ),
      },
    },
    TongTien: {
      screen: TongTienScreen,
      navigationOptions: {
        tabBarLabel: 'Tổng tiền',
        tabBarIcon: ({tintColor}) => (
          <IconAn name="calculator" size={20} color={tintColor} />
        ),
      },
    },
  },
  {
    initialRouteName: 'Home',
    activeColor: '#4CC773',
    inactiveColor: '#DCD9D9',
    barStyle: {
      backgroundColor: '#ffffff',
      borderWidth: 1,
      borderTopColor: '#56ACA5',
    },
  },
);

// stack navigatior
const StackNav = createStackNavigator(
  {
    TabBottom: TabBottom,
    Splash: SplashScreen,
    AddCustomer: AddCustomerScreen,
    DetailCustomer: DetailCustomerScreen,
    EditCustomer: UpdateCustomerSreen,
  },
  {
    initialRouteName: 'Splash',
    headerMode: 'none',
  },
);

const AppStack = createAppContainer(StackNav);

export default AppStack;
