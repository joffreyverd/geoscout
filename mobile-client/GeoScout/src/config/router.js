import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import Authentication from '../screens/Authentication';
import GeoLocation from '../screens/GeoLocation';
import Settings from '../screens/Settings.js';
import Me from '../screens/Me';

export const Tabs = createBottomTabNavigator({
  GeoLocation: {
    screen: GeoLocation,
    navigationOptions: {
      tabBarLabel: 'Carte'
    },
  },
  Me: {
    screen: Me,
    navigationOptions: {
      tabBarLabel: 'Moi'
    },
  },
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
