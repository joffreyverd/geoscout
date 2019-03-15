import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
    Dimensions,
    Image,
    TextInput,
    Modal
} from 'react-native';
import api from '../../utils/httpMethods';
import storage from '../../utils/asyncStorageToken';

import signin from '../components/Signin';

const {width,height} = Dimensions.get('window')

export default class Autentication extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            modalConnexionVisible: false,
            modalInscriptionVisible: false,
            user: {}
        }
    }

    componentDidMount() {
        if(storage.getTokenAsyncStorage()){
            api.get('whoami').then((data) => {
                this.setState({ user: data });
            }).catch((error) => {
                //GESTION DES ERREURS
                storage.removeTokenAsyncStorage();
            });
        }
    }

    sign = (route, credentials) => api.post('signin', credentials).then((data) => {
        if(storage.setTokenAsyncStorage(data.token)){
            this.setState({
                user: data.user
            });
        }else{
            //GESTION DES ERREURS
        }
    })

    signout = () => {
        if(storage.removeTokenAsyncStorage()){
            this.setState({
                user: {}
            });
        }else{
            //GESTION DES ERREURS
        }
    }

    setModalConnexionVisible(visible){
        this.setState({modalConnexionVisible: visible});
    }

    setModalInscriptionVisible(visible){
        this.setState({modalInscriptionVisible: visible});
    }

    render() {

        const { modalConnexionVisible } = this.state;

        return (
            <View style={styles.container}>
            <Signin
                sign={this.sign}
                modalConnexionVisible={modalConnexionVisible}
            />

                <Modal
                animationType="slide"
                transparent={false}
                onRequestClose={() => {
                    this.setModalInscriptionVisible(false);
                }}
                visible={this.state.modalInscriptionVisible}>
                    <View style={styles.container}>
                        <TextInput
                        value={this.state.firstname}
                        onChangeText={(firstname) => this.setState({ firstname })}
                        placeholder={'Prénom'}
                        style={styles.input}/>

                        <TextInput
                        value={this.state.lastname}
                        onChangeText={(lastname) => this.setState({ lastname })}
                        placeholder={'Nom'}
                        style={styles.input}/>

                        <TextInput
                        value={this.state.email}
                        onChangeText={(email) => this.setState({ email })}
                        placeholder={'Email'}
                        style={styles.input}/>

                        <TextInput
                        value={this.state.password}
                        onChangeText={(password) => this.setState({ password })}
                        placeholder={'Mot de passe'}
                        secureTextEntry={true}
                        style={styles.input}/>

                        <TextInput
                        value={this.state.repassword}
                        onChangeText={(repassword) => this.setState({ repassword })}
                        placeholder={'Répétez votre mot de passe'}
                        secureTextEntry={true}
                        style={styles.input}/>
                        
                        <TouchableOpacity
                        style={styles.button}
                        onPress={this.sign}>
                            <Text style={styles.textButton}>Inscription</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

                <Image
                style={{width: (width*0.8), height: (height*0.1)}}
                source={require('../../utils/img/logoGeoScoutWhite.png')}/>
                <View style={styles.wrapperBottom}>
                    <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        this.setModalConnexionVisible(true);
                    }}
                    activeOpacity={0.8}>
                        <Text
                        style={styles.textButton}>
                            Connexion
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        this.setModalInscriptionVisible(true);
                    }}
                    activeOpacity={0.8}>
                        <Text
                        style={styles.textButton}>
                            Inscription
                        </Text>
                    </TouchableOpacity>
                </View>           
            </View>
        );
    }
}

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