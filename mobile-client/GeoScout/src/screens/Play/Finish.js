import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native';
import { Input } from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import api from '../../config/httpMethods';

export default class Finish extends React.Component {
    state = {
        stars: undefined,
        comment: undefined
    };
    finish = () => {
        const {
            navigation: {
                navigate,
                state: {
                    params: { circuit, score, maxScore, time, id_ac }
                }
            }
        } = this.props;
        const { stars, comment } = this.state;

        // Envoie de la requete achievedCircuit
        const body = {
            id_circuit: circuit.id_circuit,
            statut_circuit: 1,
            version: circuit.version,
            id_step: null,
            score: score,
            max_score: maxScore,
            achievedTime: time
        };
        if (id_ac) {
            api.put(`achievedcircuit/${id_ac}`, body);
        } else {
            api.post('achievedcircuit', body);
        }
        if (stars)
            api.post('evaluations', {
                id_circuit: circuit.id_circuit,
                stars: stars,
                comment
            });
        navigate('Home');
    };

    render() {
        const {
            navigation: {
                state: {
                    params: { circuit, score, maxScore, time }
                }
            }
        } = this.props;
        const { stars, comment } = this.state;

        let minutes = Math.floor(time);
        let sec = ((time - minutes) * 60).toFixed(0);

        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <View>
                    <Text style={[styles.text, styles.textTitre]}>Bravo !</Text>
                    <Text style={[styles.text, styles.textDesc]}>
                        Vous avez terminé le circuit {circuit.name}
                    </Text>
                </View>

                <View style={styles.resumeContainer}>
                    <Text style={[styles.text, styles.textCategorie]}>
                        Résultats :
                    </Text>
                    <View>
                        <Text style={styles.text}>
                            00:{minutes < 10 ? '0' + minutes : minutes}:
                            {sec < 10 ? '0' + sec : sec}
                        </Text>
                        <Text style={[styles.text, styles.textDesc]}>
                            Temps
                        </Text>
                    </View>

                    <View>
                        <Text style={styles.text}>
                            {score}/{maxScore}
                        </Text>
                        <Text style={[styles.text, styles.textDesc]}>
                            Score
                        </Text>
                    </View>
                </View>
                <View style={styles.evalContainer}>
                    <Text style={[styles.text, styles.textDesc]}>
                        Donnez votre avis
                    </Text>
                    <StarRating
                        rating={stars}
                        selectedStar={stars => this.setState({ stars })}
                        fullStarColor="white"
                        emptyStarColor="white"
                    />
                    <Input
                        multiline
                        numberOfLines={4}
                        inputContainerStyle={styles.input}
                        inputStyle={styles.inputText}
                        placeholder="Entrez un commentaire"
                        value={comment}
                        onChangeText={comment => this.setState({ comment })}
                    />
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={this.finish}
                    activeOpacity={0.8}
                >
                    <Text style={styles.textButton}>Publier vos résultats</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#1abc9c',
        padding: 15
    },
    resumeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        width: '100%'
    },
    evalContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    text: {
        fontSize: 30,
        color: 'white',
        textAlign: 'center'
    },
    textTitre: {
        fontSize: 35
    },
    textCategorie: {
        fontSize: 25,
        marginBottom: 10,
        width: '100%'
    },
    textDesc: {
        fontSize: 18
    },
    input: {
        borderWidth: 1,
        borderColor: '#2c3e50',
        marginTop: 8,
        padding: 5,
        borderRadius: 5
    },
    inputText: {
        color: 'white'
    },
    button: {
        backgroundColor: '#2c3e50',
        borderRadius: 5,
        padding: 8,
        width: '90%',
        alignItems: 'center'
    },
    textButton: {
        color: '#fff',
        fontSize: 22
    }
});
