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

import SigninModal from '../components/Signin';
import SignupModal from '../components/Signup';

const {width,height} = Dimensions.get('window')

class Authentication extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            modalConnexionVisible: false,
            modalInscriptionVisible: false,
            user: {}
        }
    }

    //Vérification de la présence d'un token dans le storage du mobile.
    //Si le token est présent, on lance un whoami à l'api.
    //Si la requête abouti, alors l'utilisateur est rediriger sur la map.
    //Si la requête n'abouti pas, alors on supprime le token qui n'est plus valide.
    componentDidMount() {
        if(storage.getTokenAsyncStorage()){
            api.get('whoami').then((data) => {
                //ALLER SUR LA MAP AVEC LES CIRCUITS ENVIRONENT
                this.setState({
                    user: data 
                });
                this.props.navigation.navigate('Tabs', this.state.user);
            }).catch((error) => {
                //GESTION DES ERREURS
                storage.removeTokenAsyncStorage();
            });
        }
    }

    signin = (route, credentials) => api.post('signin', credentials).then((data) => {
        if(storage.setTokenAsyncStorage(data.token)){
            this.setState({
                user: data.user,
                modalConnexionVisible: false
            });

            this.props.navigation.navigate('Tabs', this.state.user);
        }else{
            //GESTION DES ERREURS
        }
    })

    signup = (route, credentials) => api.post('signup', credentials).then((data) => {
        if(storage.setTokenAsyncStorage(data.token)){
            //PROBLEME
            this.setState({
                user: data.user,
                modalInscriptionVisible: false
            });

            this.props.navigation.navigate('Tabs', this.state.user);
        }else{
            //GESTION DES ERREURS
        }
    })

    //Vérification utilité dans authentification
    signout = () => {
        if(storage.removeTokenAsyncStorage()){
            this.setState({
                user: {}
            });
        }else{
            //GESTION DES ERREURS
        }
    }

    //Fonction qui permet de changer la visibilité de la modal de connexion
    setModalConnexionVisible = (visible) => {
        this.setState({modalConnexionVisible: visible});
    }

    //Fonction qui permet de changer la visibilité de la modal d'inscription
    setModalInscriptionVisible = (visible) => {
        this.setState({modalInscriptionVisible: visible});
    }

    render() {

        const { modalConnexionVisible, modalInscriptionVisible } = this.state;

        return (
            <View style={styles.container}>
                <SigninModal
                    modalConnexionVisible={modalConnexionVisible}
                    signin={this.signin}
                    onRequestClose={() => {
                        this.setModalConnexionVisible(false);
                    }}
                />

                <SignupModal
                    modalInscriptionVisible={modalInscriptionVisible}
                    signup={this.signup}
                    onRequestClose={() => {
                        this.setModalInscriptionVisible(false);
                    }}
                />

                <Image
                    style={{width: (width*0.8), height: (height*0.1)}}
                    source={require('../../utils/img/logoGeoScoutWhite.png')}
                />

                <View style={styles.wrapperBottom}>
                    <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        this.setModalConnexionVisible(true);
                    }}
                    activeOpacity={0.8}>
                        <Text style={styles.textButton}>
                            Connexion
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        this.setModalInscriptionVisible(true);
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