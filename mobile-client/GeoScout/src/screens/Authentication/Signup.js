import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
    KeyboardAvoidingView
} from 'react-native';
import { Input, Icon } from 'react-native-elements';

export default class Signup extends React.Component {
    state = {
        firstname: '',
        errorFirstname: ' ',
        lastname: '',
        errorLastname: ' ',
        email: '',
        errorEmail: ' ',
        password: '',
        errorPassword: ' ',
        rePassword: ''
    };

    handleSubmit = e => {
        e.preventDefault();
        const { firstname, lastname, email, password, rePassword } = this.state;

        let badForm = false;
        if (firstname === '') {
            badForm = true;
            this.setState({ errorFirstname: 'Renseignez votre prénom' });
        }
        if (lastname === '') {
            badForm = true;
            this.setState({ errorLastname: 'Renseignez votre nom' });
        }
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
        } else if (password !== rePassword) {
            badForm = true;
            this.setState({
                errorPassword: 'Les deux mots de passe ne correspondent pas'
            });
        }

        if (badForm) return;

        const user = { firstname, lastname, email, password };

        this.props.navigation.state.params
            .signup(user)
            .then(() => {
                console.log('Connecté');
                // success
            })
            .catch(error => {
                // error
                console.log('Erreur');
            });
    };

    render() {
        const {
            errorPassword,
            errorFirstname,
            errorLastname,
            errorEmail
        } = this.state;

        const inputProps = {
            errorStyle: { color: '#c0392b', fontWeight: 'bold' },
            inputContainerStyle: styles.input,
            containerStyle: styles.width,
            inputStyle: styles.textInput,
            shake: true,
            leftIconContainerStyle: styles.iconInput
        };
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding"
                enabled
            >
                <Input
                    value={this.state.firstname}
                    onChangeText={firstname =>
                        this.setState({ firstname, errorFirstname: ' ' })
                    }
                    placeholder={'Prénom'}
                    errorMessage={errorFirstname}
                    leftIcon={<Icon name="person" size={24} color="white" />}
                    {...inputProps}
                />

                <Input
                    value={this.state.lastname}
                    onChangeText={lastname =>
                        this.setState({ lastname, errorLastname: ' ' })
                    }
                    placeholder={'Nom'}
                    errorMessage={errorLastname}
                    leftIcon={<Icon name="person" size={24} color="white" />}
                    {...inputProps}
                />

                <Input
                    value={this.state.email}
                    onChangeText={email =>
                        this.setState({ email, errorEmail: ' ' })
                    }
                    placeholder={'Email'}
                    errorMessage={errorEmail}
                    autoCapitalize="none"
                    leftIcon={<Icon name="email" size={24} color="white" />}
                    {...inputProps}
                />

                <Input
                    value={this.state.password}
                    onChangeText={password =>
                        this.setState({ password, errorPassword: ' ' })
                    }
                    placeholder={'Mot de passe'}
                    autoCapitalize="none"
                    errorMessage={errorPassword}
                    secureTextEntry={true}
                    leftIcon={<Icon name="lock" size={24} color="white" />}
                    {...inputProps}
                />

                <Input
                    value={this.state.repassword}
                    onChangeText={rePassword =>
                        this.setState({ rePassword, errorPassword: ' ' })
                    }
                    placeholder={'Répétez votre mot de passe'}
                    autoCapitalize="none"
                    errorMessage={errorPassword}
                    secureTextEntry={true}
                    leftIcon={<Icon name="lock" size={24} color="white" />}
                    {...inputProps}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={this.handleSubmit}
                    activeOpacity={0.8}
                >
                    <Text style={styles.textButton}>Inscription</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
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
