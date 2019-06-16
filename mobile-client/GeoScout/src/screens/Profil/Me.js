import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    TouchableOpacity,
    StyleSheet,
    View,
    Image
} from 'react-native';
import { Icon } from 'react-native-elements';
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
                email: '',
                img: ''
            }
        };
    }

    componentDidMount() {
        storage.getTokenAsyncStorage().then(token => {
            if (token) {
                api.get('whoami').then(user => {
                    api.post('download', {
                        id: user.id_user,
                        type: 'user'
                    }).then(img => {
                        this.setState({ user, img });
                    });
                });
            } else {
                this.props.navigation.navigate('Auth');
            }
        });
    }

    handleSettingsPress = () => {
        this.props.navigation.navigate('Settings');
    };

    render() {
        const { user, img } = this.state;

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
                            <View
                                style={{
                                    margin: 20,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Image
                                    source={
                                        !img ||
                                        img.length < 1 ||
                                        img === undefined
                                            ? require('../../../utils/img/userAnonymous.png')
                                            : uri`http://www.geoscout.fr:5555${img}`
                                    }
                                    style={{
                                        width: 150,
                                        height: 150,
                                        borderRadius: 150 / 2,
                                        borderColor: '#2c3e50',
                                        borderWidth: 1
                                    }}
                                />
                            </View>
                            <View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Text style={styles.profilName}>
                                    {user.lastname} {user.firstname}
                                </Text>
                            </View>
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
        justifyContent: 'center',
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
    },
    profilName: {
        color: '#2c3e50',
        fontSize: 28
    }
});
