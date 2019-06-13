import React, { Component } from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Tile, ListItem, Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';

import { NavigationHeader } from '../../components/NavigationDrawer';
import storage from '../../config/asyncStorageToken';
import api from '../../config/httpMethods';

export default class Me extends Component {
    static navigationOptions = {
        drawerLabel: 'Profil',
        drawerIcon: ({ tintColor }) => (
            <Icon name="user-circle" type="font-awesome" color="#1abc9c" />
        )
    };

    constructor() {
        super();
        this.state = {
            user: {
                lastname: '',
                firstname: '',
                email: ''
            }
        };
    }

    componentDidMount() {
        storage.getTokenAsyncStorage().then(token => {
            if (token) {
                api.get('whoami').then(user => this.setState({ user }));
            } else {
                this.props.navigation.navigate('Auth');
            }
        });
    }

    handleSettingsPress = () => {
        this.props.navigation.navigate('Settings');
    };

    render() {
        const { user } = this.state;

        return (
            <>
                <NavigationHeader
                    pressMenu={this.props.navigation.openDrawer}
                    titleText={'Profil'}
                    pressHome={() =>
                        this.props.navigation.navigate('GeoLocation')
                    }
                />
                {user ? (
                    <SafeAreaView style={styles.container}>
                        <ScrollView>
                            <Tile
                                //Faire une condition si il y a une image d'enregistré
                                //imageSrc={'../../../utils/img/userAnonymous.png'}
                                featured
                                title={'Profil'}
                            />
                            <ListItem
                                title="Nom"
                                rightTitle={user.lastname}
                                hideChevron
                            />
                            <ListItem
                                title="Prénom"
                                rightTitle={user.firstname}
                                hideChevron
                            />
                            <ListItem
                                title="Email"
                                rightTitle={user.email}
                                hideChevron
                            />
                        </ScrollView>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.handleSettingsPress}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.textButton}>Paramètres</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                ) : null}
            </>
        );
    }
}

//Feuille de style
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    button: {
        backgroundColor: '#2c3e50',
        borderRadius: 5,
        padding: 8,
        marginBottom: 10,
        width: '90%',
        alignItems: 'center'
    },
    textButton: {
        color: '#fff',
        fontSize: 18
    }
});
