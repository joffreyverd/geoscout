import React from 'react';
import { Header } from 'react-native-elements';
import { DrawerItems } from 'react-navigation';

export const DrawerContent = ({ items, ...props }) => {
    const drawerItems = [
        'GeoLocation',
        'Me',
        'DownloadCircuit',
        'FavoriteCircuit'
    ];
    const filteredItems = items.filter(item => drawerItems.includes(item.key));

    return <DrawerItems items={filteredItems} {...props} />;
};

export function NavigationHeader({
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
