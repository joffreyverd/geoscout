import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Icon } from 'react-native-elements';

import { NavigationHeader } from '../../components/NavigationDrawer';
import ListCircuit from '../../components/ListCircuit';

export default class FavoriteCircuit extends React.Component {
    static navigationOptions = {
        drawerLabel: 'Circuits favoris',
        drawerIcon: () => (
            <Icon name="favorite" type="material" color="#1abc9c" />
        )
    };

    render() {
        return (
            <>
                <NavigationHeader
                    pressMenu={this.props.navigation.openDrawer}
                    titleText={'Circuits favoris'}
                    pressHome={() =>
                        this.props.navigation.navigate('GeoLocation')
                    }
                />
                <SafeAreaView style={styles.container}>
                    <ListCircuit
                        type={'api'}
                        format={false}
                        root={'favorites'}
                        navigate={this.props.navigation.navigate}
                    />
                </SafeAreaView>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dedede',
        padding: 10
    },
    title: {
        color: '#1abc9c',
        fontWeight: 'bold',
        fontSize: 26
    }
});
