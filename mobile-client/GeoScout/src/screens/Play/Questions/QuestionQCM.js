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
    state = {};

    componentDidMount() {
        const {
            question: { response }
        } = this.props.navigation.state.params;

        const choix = response.split(':')[0].split(',');
        const state = {};
        choix.forEach(element => {
            state[element] = false;
        });

        this.setState(state);
    }

    handleSubmit = e => {
        e.preventDefault();
        const {
            question: { response, difficulty }
        } = this.props.navigation.state.params;
        let isGood = '',
            score = 0;
        let maxScore = 15;
        if (difficulty) maxScore = difficulty * 5;

        const [strChoix, reponse] = response.split(':');
        const choix = strChoix.split(',');
        let selected;
        choix.forEach(element => {
            if (this.state[element]) selected = element;
        });

        if (selected === reponse) {
            isGood = 'Bonne réponse';
            score = 10;
        } else {
            isGood = 'Mauvaise réponse';
        }

        Alert.alert(
            isGood,
            `C'est une ${isGood} , vous avez gagnez ${score} point(s)`,
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

        const choix = response.split(':')[0].split(',');

        return (
            <>
                <View style={[styles.container, styles.containerQuestion]}>
                    <ScrollView>
                        {/* <HTML html={wording} imagesMaxWidth={Dimensions.get('window').width} /> */}
                        <Text style={styles.description}>{wording}</Text>
                    </ScrollView>

                    <View style={styles.containerCheck}>
                        {choix.map((item, idx) => (
                            <CheckBox
                                key={idx}
                                title={item}
                                checked={this.state[item]}
                                onPress={() =>
                                    this.setState(prevState => {
                                        return {
                                            [item]: !prevState[item]
                                        };
                                    })
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
