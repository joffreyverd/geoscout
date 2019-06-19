import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
    Dimensions,
    Image,
    NetInfo
} from 'react-native';

import api from '../../config/httpMethods';
import storage from '../../config/asyncStorageToken';

const { width, height } = Dimensions.get('window');

class Authentication extends React.Component {
    state = {
        button: false
    };
    async componentDidMount() {
        const connected = await NetInfo.isConnected.fetch();
        if (connected) {
            this.signinWithToken();
        } else {
            this.setState({
                error: 'Veuillez activer internet',
                interval: setInterval(this.hasInternet, 1000)
            });
        }
    }

    componentWillUnmount() {
        const { interval } = this.state;
        if (interval) clearInterval(interval);
    }

    hasInternet = () => {
        NetInfo.isConnected.fetch().then(connected => {
            if (connected) {
                const { interval } = this.state;
                clearInterval(interval);
                this.signinWithToken();
            }
        });
    };

    signinWithToken = () => {
        storage.getTokenAsyncStorage().then(token => {
            if (token) {
                api.get('whoami')
                    .then(data => {
                        //ALLER SUR LA MAP AVEC LES CIRCUITS ENVIRONNANT
                        this.props.navigation.navigate('Home', data.user);
                    })
                    .catch(error => {
                        //GESTION DES ERREURS
                        storage.removeTokenAsyncStorage();
                    });
            } else this.setState({ button: true });
        });
    };

    signin = credentials =>
        api.post('signin', credentials).then(this.stockageUser);

    signup = credentials =>
        api.post('signup', credentials).then(this.stockageUser);

    stockageUser = data => {
        storage.setTokenAsyncStorage(data.token);
        this.props.navigation.navigate('Home', data.user);
    };

    render() {
        const { navigation } = this.props;
        const { button, error } = this.state;

        return (
            <View style={styles.container}>
                <Image
                    style={{ width: width * 0.8, height: height * 0.1 }}
                    source={require('../../../utils/img/logoGeoScoutWhite.png')}
                />

                <View style={styles.wrapperBottom}>
                    {button ? (
                        <>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    navigation.navigate('Signin', {
                                        signin: this.signin
                                    });
                                }}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.textButton}>Connexion</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    navigation.navigate('Signup', {
                                        signup: this.signup
                                    });
                                }}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.textButton}>
                                    Inscription
                                </Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <Text style={styles.errorText}>{error}</Text>
                    )}
                </View>
            </View>
        );
    }
}

export default Authentication;

//Feuille de style
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1abc9c'
    },
    big: {
        color: '#8e44ad',
        textAlign: 'center',
        fontSize: 36
    },
    errorText: {
        width: '100%',
        fontSize: 24,
        textAlign: 'center',
        color: '#e74c3c',
        fontWeight: 'bold'
    },
    wrapperBottom: {
        width: '100%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10
    },
    button: {
        backgroundColor: '#006A55',
        borderRadius: 5,
        padding: 8,
        marginBottom: 5,
        width: '90%',
        alignItems: 'center'
    },
    textButton: {
        color: '#fff',
        fontSize: 18
    },
    input: {
        width: '90%',
        padding: 8,
        borderWidth: 1,
        borderColor: '#006A55',
        borderRadius: 5,
        backgroundColor: '#fff',
        marginBottom: 10
    }
});
