import React, { Component } from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Tile, ListItem, Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';

import {
    NavigationHeader,
    NavigationMenu
} from '../../components/NavigationMenu';
import storage from '../../config/asyncStorageToken';
import api from '../../config/httpMethods';

export default class Me extends Component {
    constructor() {
        super();
        this.state = {
            menuOpen: false,
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
                api.get('whoami').then(user => this.setUser(user));
            } else {
                this.props.navigation.navigate('Auth');
            }
        });
    }

    setUser(user) {
        this.setState({
            user
        });
    }

    handleSettingsPress = () => {
        this.props.navigation.navigate('Settings');
    };

    handleSignout = () => {
        storage.removeTokenAsyncStorage().then(() => {
            this.props.navigation.navigate('Auth');
        });
    };
    render() {
        const { user, menuOpen } = this.state;

        return (
            <NavigationMenu
                isOpen={menuOpen}
                toggle={menuOpen => this.setState({ menuOpen })}
                navigate={this.props.navigation.navigate}
            >
                <NavigationHeader
                    pressMenu={() => this.setState({ menuOpen: true })}
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
                        <TouchableOpacity
                            style={Object.assign({}, styles.button, {
                                backgroundColor: '#c0392b'
                            })}
                            onPress={this.handleSignout}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.textButton}>Déconnexion</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                ) : null}
            </NavigationMenu>
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
