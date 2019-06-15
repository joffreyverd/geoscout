import React from 'react';
import { Header, Button } from 'react-native-elements';
import { DrawerItems, SafeAreaView } from 'react-navigation';

import storage from '../config/asyncStorageToken';

export const DrawerContent = ({ items, ...props }) => {
    const drawerItems = [
        'GeoLocation',
        'Me',
        'MyCircuits',
        'DownloadCircuit',
        'FavoriteCircuit'
    ];
    const filteredItems = items.filter(item => drawerItems.includes(item.key));

    return (
        <SafeAreaView
            style={{
                display: 'flex',
                height: '100%',
                justifyContent: 'space-between'
            }}
        >
            <DrawerItems items={filteredItems} {...props} />
            <Button
                title="Se déconnecter"
                icon={{ name: 'exit-to-app', color: 'white' }}
                buttonStyle={{ backgroundColor: '#f44336', borderRadius: 0 }}
                onPress={() =>
                    storage.removeTokenAsyncStorage().then(() => {
                        props.navigation.navigate('Auth');
                    })
                }
            />
        </SafeAreaView>
    );
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
                onPress: pressMenu,
                size: 36
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
