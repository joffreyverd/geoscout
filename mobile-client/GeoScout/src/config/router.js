import React from 'react';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Authentication from '../screens/Authentication';
import GeoLocation from '../screens/GeoLocation';
import Settings from '../screens/Settings.js';
import Me from '../screens/Me';

export const Tabs = createBottomTabNavigator({
  GeoLocation: {
    screen: GeoLocation,
    navigationOptions: {
      tabBarLabel: 'Carte',
      tabBarIcon: (({ tintColor }) => (<Icon name='map' type='font-awesome' size={20} color={tintColor} />)),
      tabBarOptions: {
        activeTintColor: 'white',
        inactiveTintColor: '#2c3e50',
        labelStyle: {
          fontSize: 14,
        },
        style: {
          backgroundColor: '#1abc9c',
          borderWidth: 1,
          borderColor: '#2c3e50',
        },
      },
    },
  },
  Me: {
    screen: Me,
    navigationOptions: {
      tabBarLabel: 'Moi',
      tabBarIcon: (({ tintColor }) => (<Icon name='user-circle' type='font-awesome' size={20} color={tintColor} />)),
      tabBarOptions: {
        activeTintColor: 'white',
        inactiveTintColor: '#2c3e50',
        labelStyle: {
          fontSize: 14,
        },
        style: {
          backgroundColor: '#1abc9c',
        },
      },
    },
  }
});

export const RootStack = createStackNavigator({
    Tabs: {
      screen: Tabs
    },
    Authentication: {
      screen: Authentication
    },
    GeoLocation: {
      screen: GeoLocation
    },
    Me: {
      screen: Me
    },
    Settings: {
      screen: Settings
    },
  },
  {
  mode: 'modal',
  headerMode: 'none',
  initialRouteName: 'Authentication'
});

export const AppContainer = createAppContainer(RootStack);
