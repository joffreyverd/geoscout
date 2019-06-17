import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    //Dimensions,
    ScrollView,
    StyleSheet,
    Alert,
    KeyboardAvoidingView
} from 'react-native';

/**
 * Formatage d'une chaîne de réponse pour la comparer à d'autres
 * @param {String}  : la chaîne a modifié
 */
function formatResponse(str) {
    return str
        .toLowerCase()
        .normalize('NFD') // Séparation lettres-accents
        .replace(/[^a-z0-9%,]/g, ''); // Suppression de tous les caractères spéciaux
}

export default class QuestionLibre extends React.Component {
    state = {
        userResponse: ''
    };

    handleSubmit = e => {
        e.preventDefault();
        const {
            question: { response: trueResponse, difficulty }
        } = this.props.navigation.state.params;

        const { userResponse } = this.state;

        let isGood = '',
            score = 0,
            gain = '';
        let maxScore = 15;
        if (difficulty) maxScore = difficulty * 5;

        const responses = formatResponse(trueResponse).split(',');

        if (userResponse && responses.includes(formatResponse(userResponse))) {
            isGood = 'bonne réponse';
            score = maxScore;
            gain = `vous avez gagnez ${score} points`;
        } else {
            isGood = 'mauvaise réponse';
            gain = 'vous ne gagnez pas de point';
        }

        Alert.alert(
            isGood[0].toUpperCase() + isGood.slice(1),
            `C'est une ${isGood} , ${gain}.`,
            [
                {
                    text: 'Ok',
                    onPress: () =>
                        this.props.navigation.state.params.nextStep(
                            score,
                            maxScore
                        )
                }
            ],
            { cancelable: false }
        );
    };

    render() {
        const {
            question: { wording }
        } = this.props.navigation.state.params;
        return (
            <KeyboardAvoidingView
                style={{ flex: 1, backgroundColor: '#1abc9c' }}
                behavior="padding"
            >
                <View style={[styles.container, styles.containerQuestion]}>
                    <ScrollView>
                        <Text style={styles.description}>{wording}</Text>
                    </ScrollView>

                    <TextInput
                        value={this.state.userResponse}
                        onChangeText={userResponse =>
                            this.setState({ userResponse })
                        }
                        placeholder={'Réponse'}
                        style={styles.input}
                        onSubmitEditing={this.handleSubmit}
                    />
                </View>
                <View style={[styles.container, styles.containerButton]}>
                    <TouchableOpacity
                        onPress={this.handleSubmit}
                        activeOpacity={0.8}
                        style={styles.button}
                    >
                        <Text style={styles.textButton}>Valider</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1abc9c',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    containerQuestion: {
        paddingTop: 40,
        paddingBottom: 50,
        flex: 1,
        justifyContent: 'flex-start'
    },
    containerButton: {
        alignItems: 'center'
    },
    description: {
        color: 'white',
        fontSize: 22
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
        fontSize: 22
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
