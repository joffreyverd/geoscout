import React from 'react';
import {
    createStackNavigator,
    createSwitchNavigator,
    createDrawerNavigator,
    createAppContainer
} from 'react-navigation';

import Authentication from '../screens/Authentication/Authentication';
import Signin from '../screens/Authentication/Signin';
import Signup from '../screens/Authentication/Signup';

import GeoLocation from '../screens/GeoLocation';
import DownloadCircuit from '../screens/Circuit/DownloadCircuit';
import FavoriteCircuit from '../screens/Circuit/FavoriteCircuit';
import DetailCircuit from '../screens/Circuit/DetailCircuit';
import Settings from '../screens/Profil/Settings.js';
import Me from '../screens/Profil/Me';

import Transit from '../screens/Play/Transit';
import Etape from '../screens/Play/Etape';
import QuestionLibre from '../screens/Play/Questions/QuestionLibre';
import QuestionQCM from '../screens/Play/Questions/QuestionQCM';
import Finish from '../screens/Play/Finish';

const PrincipalStack = createDrawerNavigator(
    {
        Me: Me,
        Settings: Settings,
        GeoLocation: GeoLocation,
        DownloadCircuit: DownloadCircuit,
        FavoriteCircuit: FavoriteCircuit,
        DetailCircuit: DetailCircuit
    },
    {
        drawerWidth: 300,
        initialRouteName: 'GeoLocation',
        order: ['GeoLocation', 'Me', 'DownloadCircuit', 'FavoriteCircuit'],
        contentOptions: {
            labelStyle: { width: '100%' }
        }
    }
);

// Stack d'une étape de jeu
const EtapeStack = createStackNavigator(
    {
        Etape: Etape,
        QuestionLibre: QuestionLibre,
        QuestionQCM: QuestionQCM
    },
    {
        initialRouteName: 'Etape',
        headerMode: 'none'
    }
);

// Switch Stack du jeu
const PlaySwitch = createSwitchNavigator({
    Transit: Transit,
    EtapeStack: EtapeStack,
    Finish: Finish
});

// Switch Stack de l'authentification
const AuthStack = createStackNavigator(
    {
        Authentication: Authentication,
        Signin: Signin,
        Signup: Signup
    },
    {
        headerMode: 'none',
        initialRouteName: 'Authentication'
    }
);

// Navigateur Root de l'application
export const RootStack = createSwitchNavigator(
    {
        Auth: AuthStack,
        Home: PrincipalStack,
        Play: PlaySwitch
    },
    {
        mode: 'card',
        headerMode: 'none',
        initialRouteName: 'Auth'
    }
);

export const AppContainer = createAppContainer(RootStack);
