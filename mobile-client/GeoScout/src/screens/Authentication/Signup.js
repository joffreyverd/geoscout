import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
    TextInput
} from 'react-native';

export default class Signup extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            rePassword: ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        //FAIRE LES VERIF

        // Copie du state dans un nouvel objet pour pouvoir supprimer des propriétés
        const user = Object.assign({}, this.state);
        delete user.rePassword;

        this.props.navigation.state.params.signup(user).then(() => {
            console.log("Connecté");
            // success
        }).catch((error) => {
            // error
            console.log("Erreur");
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    value={this.state.firstname}
                    onChangeText={(firstname) => this.setState({ firstname })}
                    placeholder={'Prénom'}
                    style={styles.input}
                />

                <TextInput
                    value={this.state.lastname}
                    onChangeText={(lastname) => this.setState({ lastname })}
                    placeholder={'Nom'}
                    style={styles.input}
                />

                <TextInput
                    value={this.state.email}
                    onChangeText={(email) => this.setState({ email })}
                    placeholder={'Email'}
                    style={styles.input}
                />

                <TextInput
                    value={this.state.password}
                    onChangeText={(password) => this.setState({ password })}
                    placeholder={'Mot de passe'}
                    secureTextEntry={true}
                    style={styles.input}
                />

                <TextInput
                    value={this.state.repassword}
                    onChangeText={(repassword) => this.setState({ rePassword })}
                    placeholder={'Répétez votre mot de passe'}
                    secureTextEntry={true}
                    style={styles.input}
                />
                
                <TouchableOpacity
                style={styles.button}
                onPress={this.handleSubmit}
                activeOpacity={0.8}>
                    <Text style={styles.textButton}>Inscription</Text>
                </TouchableOpacity>
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