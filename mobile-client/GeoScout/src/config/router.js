import React from 'react';
import {
    createBottomTabNavigator, createStackNavigator,
    createSwitchNavigator, createAppContainer
} from 'react-navigation';
import { Icon } from 'react-native-elements';

import Authentication from '../screens/Authentication';
import GeoLocation from '../screens/GeoLocation';
import Settings from '../screens/Settings.js';
import Signin from '../components/Signin';
import Signup from '../components/Signup';
import Me from '../screens/Me';

const Home = createBottomTabNavigator({
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
                    borderWidth: 1,
                    borderColor: '#2c3e50',
                },
            },
        },
    }
});

// const PlaySwitch = createSwitchNavigator(
//     {
//         Start: Start,
//         Etape: Etape
//     }, {
//         headerMode: 'none',
//         initialRouteName: Start
//     }
// )

const AuthStack = createStackNavigator(
    {
        Authentication: {
            screen: Authentication
        },
        Signin: Signin,
        Signup: Signup,
    }, {
        headerMode: 'none',
        initialRouteName: 'Authentication'
    }
)


export const RootStack = createSwitchNavigator(
    {
        Auth: AuthStack,
        Home: Home,
        Settings: Settings,
    },
    {
        mode: 'card',
        headerMode: 'none',
        initialRouteName: 'Auth'
    });

export const AppContainer = createAppContainer(RootStack);
