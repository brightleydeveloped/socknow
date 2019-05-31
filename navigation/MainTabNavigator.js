import React from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { observer } from 'mobx-react';
import ToastIcon from '../components/Tabs/Toast';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import TrackScreen from '../screens/TrackScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Shop',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const CartStack = createStackNavigator({
  Cart: CartScreen,
});

const ViewObserver = observer(View);

CartStack.navigationOptions = {
  tabBarLabel: 'Cart',
  tabBarIcon: ({ focused }) => (
    <View style={{position: 'relative'}}>
	    <TabBarIcon
			    style={styles.tabBarIcon}
			    focused={focused}
			    name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
	    />
      <ToastIcon />
    </View>
  ),
};

const TrackStack = createStackNavigator({
  TrackScreen: TrackScreen,
});

TrackStack.navigationOptions = {
  tabBarLabel: 'Track',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  CartStack,
  TrackStack,
});


const styles = StyleSheet.create({
  tabBarIcon: {
    position: 'relative',
    top: 2,
    left: 0
  }
});
