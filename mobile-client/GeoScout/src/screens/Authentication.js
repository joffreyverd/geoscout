import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
    Dimensions,
    Image
} from 'react-native';
import api from '../config/httpMethods';
import storage from '../config/asyncStorageToken';


const {width,height} = Dimensions.get('window')

class Authentication extends React.Component{
    //Vérification de la présence d'un token dans le storage du mobile.
    //Si le token est présent, on lance un whoami à l'api.
    //Si la requête abouti, alors l'utilisateur est rediriger sur la map.
    //Si la requête n'abouti pas, alors on supprime le token qui n'est plus valide.
    componentDidMount() {
        storage.getTokenAsyncStorage().then((token) => {
            if (token) {
                api.get('whoami').then((data) => {
                    //ALLER SUR LA MAP AVEC LES CIRCUITS ENVIRONNANT
                    this.props.navigation.navigate('Home', data.user);
                }).catch((error) => {
                    //GESTION DES ERREURS
                });
            }
        });
    }

    signin = (credentials) => api.post('signin', credentials).then(this.stockageUser);

    signup = (credentials) => api.post('signup', credentials).then(this.stockageUser);

    stockageUser = (data) => {
        storage.setTokenAsyncStorage(data.token);
        this.props.navigation.navigate('Home', data.user);
    }

    render() {
        const { navigation } = this.props;

        return (
            <View style={styles.container}>

                <Image
                    style={{width: (width*0.8), height: (height*0.1)}}
                    source={require('../../utils/img/logoGeoScoutWhite.png')}
                />

                <View style={styles.wrapperBottom}>
                    <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate('Signin',{
                            signin: this.signin,
                        })
                    }}
                    activeOpacity={0.8}>
                        <Text style={styles.textButton}>
                            Connexion
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate('Signup', {
                            signup: this.signup
                        })
                    }}
                    activeOpacity={0.8}>
                        <Text style={styles.textButton}>
                            Inscription
                        </Text>
                    </TouchableOpacity>
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
        fontSize: 24,
        textAlign: 'center',
        color: '#2c3e50'
    },
    wrapperBottom: {
        width: '100%', 
        height: 100,
        justifyContent: 'center', 
        alignItems: 'center',
        position: 'absolute',
        bottom: 0
    },
    button: {
        backgroundColor: '#2c3e50',
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
        borderColor: '#2c3e50',
        borderRadius: 5,
        backgroundColor: '#fff',
        marginBottom: 10
    }
});