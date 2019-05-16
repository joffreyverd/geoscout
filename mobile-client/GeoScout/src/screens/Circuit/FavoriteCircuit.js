import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import {
    NavigationHeader,
    NavigationMenu
} from '../../components/NavigationMenu';
import ListCircuit from '../../components/ListCircuit';

export default class FavoriteCircuit extends React.Component {
    constructor() {
        super();
        this.state = {
            menuOpen: false
        };
    }

    render() {
        const { menuOpen } = this.state;
        return (
            <NavigationMenu
                isOpen={menuOpen}
                toggle={menuOpen => this.setState({ menuOpen })}
                navigate={this.props.navigation.navigate}
            >
                <NavigationHeader
                    pressMenu={() => this.setState({ menuOpen: true })}
                    titleText={'Favoris'}
                    pressHome={() =>
                        this.props.navigation.navigate('GeoLocation')
                    }
                />
                <SafeAreaView style={styles.container}>
                    <ListCircuit
                        root={'favorites'}
                        navigate={this.props.navigation.navigate}
                    />
                </SafeAreaView>
            </NavigationMenu>
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
