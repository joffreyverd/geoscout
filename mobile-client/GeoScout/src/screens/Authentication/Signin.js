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
            errorEmail: ' ',
            password: '',
            errorPassword: ' '
        };
    }

    handleSubmit = e => {
        e.preventDefault();
        const { email, password } = this.state;

        let badForm = false;
        if (email === '') {
            badForm = true;
            this.setState({ errorEmail: 'Renseignez votre adresse mail' });
        } else if (!email.includes('@')) {
            badForm = true;
            this.setState({ errorEmail: 'Renseignez une adresse mail valide' });
        }

        if (password === '') {
            badForm = true;
            this.setState({ errorPassword: 'Renseignez un mot de passe' });
        }

        if (badForm) return;

        const user = { email, password };

        this.props.navigation.state.params.signin(user).catch(error => {
            if (error.code === 401) {
                this.setState({ errorPassword: error.text });
            }
        });
    };

    render() {
        const { errorEmail, errorPassword } = this.state;
        const inputProps = {
            autoCapitalize: 'none',
            errorStyle: { color: '#c0392b', fontWeight: 'bold' },
            inputContainerStyle: styles.input,
            containerStyle: styles.width,
            inputStyle: styles.textInput,
            shake: true,
            leftIconContainerStyle: styles.iconInput
        };

        return (
            <View style={styles.container}>
                <Input
                    value={this.state.email}
                    onChangeText={email =>
                        this.setState({ email, errorEmail: ' ' })
                    }
                    errorMessage={errorEmail}
                    placeholder="Email"
                    leftIcon={<Icon name="email" size={24} color="white" />}
                    {...inputProps}
                />
                <Input
                    value={this.state.password}
                    onChangeText={password =>
                        this.setState({ password, errorPassword: ' ' })
                    }
                    errorMessage={errorPassword}
                    placeholder="Mot de passe"
                    secureTextEntry={true}
                    leftIcon={<Icon name="lock" size={24} color="white" />}
                    {...inputProps}
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
        backgroundColor: '#03876D'
    },
    iconInput: {
        marginRight: 10
    },
    width: {
        width: '95%'
    }
});
