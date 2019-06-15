import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    //Dimensions,
    ScrollView,
    StyleSheet,
    Alert
} from 'react-native';
import { CheckBox } from 'react-native-elements';

export default class QuestionQCM extends React.Component {
    state = {
        selected: null
    };

    handleSubmit = e => {
        e.preventDefault();
        const {
            question: { response, difficulty }
        } = this.props.navigation.state.params;
        const { selected } = this.state;

        let isGood = '',
            score = 0,
            gain = '';
        let maxScore = 15;
        if (difficulty) maxScore = difficulty * 5;

        // Récupération de la bonne réponse
        const [__, reponse] = response.split(':');

        if (selected === reponse) {
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
            question: { wording, response }
        } = this.props.navigation.state.params;
        const { selected } = this.state;

        const choix = response.split(':')[0].split(',');

        return (
            <>
                <View style={[styles.container, styles.containerQuestion]}>
                    <ScrollView>
                        <Text style={styles.description}>{wording}</Text>
                    </ScrollView>

                    <View style={styles.containerCheck}>
                        {choix.map((item, idx) => (
                            <CheckBox
                                key={idx}
                                title={item}
                                checked={item === selected}
                                onPress={() =>
                                    this.setState({ selected: item })
                                }
                            />
                        ))}
                    </View>
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
            </>
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
    containerCheck: {
        flex: 1,
        width: '90%'
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
    }
});
