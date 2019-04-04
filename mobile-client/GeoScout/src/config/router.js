import React from 'react';
import {
    createBottomTabNavigator, createStackNavigator,
    createSwitchNavigator, createAppContainer
} from 'react-navigation';
import { Icon } from 'react-native-elements';

import Authentication from '../screens/Authentication/Authentication';
import Signin from '../screens/Authentication/Signin';
import Signup from '../screens/Authentication/Signup';

import GeoLocation from '../screens/GeoLocation';
import DetailCircuit from '../screens/Circuit/DetailCircuit';
import Settings from '../screens/Profil/Settings.js';
import Me from '../screens/Profil/Me';

import Start from '../screens/Play/Start';
import Transit from '../screens/Play/Transit';
import Etape from '../screens/Play/Etape';
import Question from '../screens/Play/Question';
import Finish from '../screens/Play/Finish';

// Style des tab du TabNnavigator
const styleTab = {
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
};

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
        DetailCircuit: DetailCircuit,
        Start: Start
    }, {
        headerMode: 'none',
        initialRouteName: 'GeoLocation'
    }
);

// Tab de navigation pour la map et le profil utilisateur
const Home = createBottomTabNavigator({
    GeoLocation: {
        screen: circuitStack,
        navigationOptions: {
            tabBarLabel: 'Carte',
            tabBarIcon: (({ tintColor }) => (<Icon name='map' type='font-awesome' size={20} color={tintColor} />)),
            tabBarOptions: styleTab,
        },
    },
    Profil: {
        screen: ProfilStack,
        navigationOptions: {
            tabBarLabel: 'Profil',
            tabBarIcon: (({ tintColor }) => (<Icon name='user-circle' type='font-awesome' size={20} color={tintColor} />)),
            tabBarOptions: styleTab,
        },
    }
});

// Stack d'une étape de jeu
const EtapeStack = createStackNavigator(
    {
        Etape: Etape,
        Question: Question
    }, {
        headerMode: 'none',
        initialRouteName: 'Etape'
    }
);

// Switch Stack du jeu
const PlaySwitch = createSwitchNavigator(
    {
        Transit: Transit,
        EtapeStack: EtapeStack,
        Finish: Finish
    }, {
        headerMode: 'none'
    }
)


// Switch Stack de l'authentification
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

// Navigateur Root de l'application
export const RootStack = createSwitchNavigator(
    {
        Auth: AuthStack,
        Home: Home,
        Play: PlaySwitch,
    },
    {
        mode: 'card',
        headerMode: 'none',
        initialRouteName: 'Auth'
    }
);

export const AppContainer = createAppContainer(RootStack);
