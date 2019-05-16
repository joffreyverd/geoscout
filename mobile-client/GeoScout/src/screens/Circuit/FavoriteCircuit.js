import React from 'react';
import {
    Text,
    StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Icon } from 'react-native-elements';

import { NavigationHeader, NavigationMenu } from '../../components/NavigationMenu';

export default class FavoriteCircuit extends React.Component {
    constructor(){
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
            navigate={this.props.navigation.navigate}>
            <NavigationHeader
            pressMenu={() => this.setState({ menuOpen: true })}
            titleText={'Favoris'}
            pressHome={() => this.props.navigation.navigate('GeoLocation')}/>
                <SafeAreaView style={styles.container}>
                    <Text style={styles.title}>En construction</Text>
                </SafeAreaView>
            </NavigationMenu>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginRight: 10,
        marginLeft: 10,
        marginTop: 25
    },
    title: {
        color: '#1abc9c',
        fontWeight: 'bold',
        fontSize: 26        
    }
});
