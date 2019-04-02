import React from 'react';
import {
    createBottomTabNavigator, createStackNavigator,
    createSwitchNavigator, createAppContainer
} from 'react-navigation';
import { Icon } from 'react-native-elements';

import Authentication from '../screens/Authentication/Authentication';
import GeoLocation from '../screens/GeoLocation';
import DetailCircuit from '../screens/Circuit/DetailCircuit';
import Settings from '../screens/Profil/Settings.js';
import Signin from '../screens/Authentication/Signin';
import Signup from '../screens/Authentication/Signup';
import Me from '../screens/Profil/Me';

const ProfilStack = createStackNavigator(
    {
        Me: Me,
        Settings: Settings
    }, {
        initialRouteName: 'Me'
    }
);

const circuitStack = createStackNavigator(
    {
        GeoLocation: GeoLocation,
        DetailCircuit: DetailCircuit
    }, {
        headerMode: 'none',
        initialRouteName: 'GeoLocation'
    }
);

const Home = createBottomTabNavigator({
    GeoLocation: {
        screen: circuitStack,
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
    Profil: {
        screen: ProfilStack,
        navigationOptions: {
            tabBarLabel: 'Profil',
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
        Authentication: Authentication,
        Signin: Signin,
        Signup: Signup,
    }, {
        headerMode: 'none',
        initialRouteName: 'Authentication'
    }
);


export const RootStack = createSwitchNavigator(
    {
        Auth: AuthStack,
        Home: Home
    },
    {
        mode: 'card',
        headerMode: 'none',
        initialRouteName: 'Auth'
    }
);

export const AppContainer = createAppContainer(RootStack);
