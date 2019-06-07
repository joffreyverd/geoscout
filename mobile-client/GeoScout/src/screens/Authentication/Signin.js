import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
    TextInput
} from 'react-native';
import { Input, Icon } from 'react-native-elements';

export default class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleSubmit = e => {
        e.preventDefault();

        // Copie du state dans un nouvel objet
        const user = Object.assign({}, this.state);

        this.props.navigation.state.params
            .signin(user)
            .catch(error => console.log(error));
    };

    render() {
        return (
            <View style={styles.container}>
                <Input
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                    placeholder={'Email'}
                    inputContainerStyle={styles.input}
                    containerStyle={styles.width}
                    inputStyle={styles.textInput}
                    shake={true}
                    leftIcon={<Icon name="email" size={24} color="white" />}
                    leftIconContainerStyle={styles.iconInput}
                />
                <Input
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    placeholder={'Mot de passe'}
                    inputContainerStyle={styles.input}
                    containerStyle={styles.width}
                    inputStyle={styles.textInput}
                    secureTextEntry={true}
                    shake={true}
                    leftIcon={<Icon name="lock" size={24} color="white" />}
                    leftIconContainerStyle={styles.iconInput}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={this.handleSubmit}
                    activeOpacity={0.8}
                >
                    <Text style={styles.textButton}>Connexion</Text>
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
    textInput: {
        color: 'white'
    },
    input: {
        borderWidth: 1,
        borderColor: '#006A55',
        borderRadius: 5,
        marginBottom: 15,
        backgroundColor: '#03876D'
    },
    iconInput: {
        marginRight: 10
    },
    width: {
        width: '95%'
    }
});
