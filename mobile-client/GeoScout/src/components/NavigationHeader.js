import React from 'react';
import { Header } from 'react-native-elements';

export default function NavigationHeader({
    pressMenu,
    titleText,
    rightComponent,
    pressHome
}) {
    let homeNavigate = null;
    if (pressHome != null) {
        homeNavigate = {
            icon: 'home',
            color: 'white',
            onPress: pressHome
        };
    } else {
        homeNavigate = rightComponent;
    }
    return (
        <Header
            placement="left"
            leftComponent={{
                icon: 'menu',
                color: 'white',
                onPress: pressMenu
            }}
            centerComponent={{
                text: titleText,
                style: { color: '#fff', fontSize: 18 }
            }}
            rightComponent={homeNavigate}
            backgroundColor="#1abc9c"
        />
    );
}
