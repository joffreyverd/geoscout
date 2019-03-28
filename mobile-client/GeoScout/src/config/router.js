import React from 'react';
import { createBottomTabNavigator, createStackNavigator,
    createSwitchNavigator, createAppContainer } from 'react-navigation';
import { Text } from 'react-native';

import Authentication from '../screens/Authentication';
import GeoLocation from '../screens/GeoLocation';
import Settings from '../screens/Settings.js';
import Signin from '../components/Signin';
import Signup from '../components/Signup';
import Me from '../screens/Me';

const Tabs = createBottomTabNavigator({
    GeoLocation: {
        screen: GeoLocation,
        navigationOptions: {
            tabBarLabel: 'Carte'
        },
    },
    Me: {
        screen: () => {return <Text>Salut, c'est moi.</Text>},
        navigationOptions: {
            tabBarLabel: 'Moi'
        },
    },
});

const AuthStack = createStackNavigator(
    {
        Authentication: {
            screen: Authentication
        },
        Signin: Signin,
        Signup: Signup,
    },{
        headerMode: 'none',
        initialRouteName: 'Authentication'
    }
)

export const RootStack = createSwitchNavigator(
    {
        Auth: AuthStack,
        Tabs: {
            screen: Tabs
        },
        Settings: {
            screen: Settings
        },
    },
    {
        mode: 'card',
        headerMode: 'none',
        initialRouteName: 'Auth'
    });

export const AppContainer = createAppContainer(RootStack);
