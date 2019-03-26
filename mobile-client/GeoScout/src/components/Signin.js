import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
    TextInput,
    Modal
} from 'react-native';

export default class SigninModal extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            email: 'stevy.palarski@gmail.com',
            password: 'rootroot'
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {
            email,
            password
        } = this.state;

        // Copie du state dans un nouvel objet
        const user = Object.assign({}, this.state);
        console.log(user);

        this.props.signin('signin', user).then((data) => {
            // success
            console.log("Connecté");
        }).catch((error) => {
            // error
            console.log(error);
        });
    }

    render() {
        return (
            <Modal
            animationType='slide'
            transparent={false}
            onRequestClose={this.props.onRequestClose}
            visible={this.props.modalConnexionVisible}>
                <View style={styles.container}>
                    <TextInput
                        value={this.state.email}
                        //onChangeText={(email) => this.setState({ email })}
                        placeholder={'Email'}
                        style={styles.input}
                    />

                    <TextInput
                        value={this.state.password}
                        //onChangeText={(password) => this.setState({ password })}
                        placeholder={'Mot de passe'}
                        secureTextEntry={true}
                        style={styles.input}
                    />
                    
                    <TouchableOpacity
                    style={styles.button}
                    onPress={this.handleSubmit}
                    activeOpacity={0.8}>
                        <Text style={styles.textButton}>Connexion</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
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
