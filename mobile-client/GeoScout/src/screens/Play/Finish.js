import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import api from '../../config/httpMethods';

export default class Finish extends React.Component {
    finish = () => {
        const {
            navigation: {
                navigate,
                state: {
                    params: { circuit, score, maxScore, time }
                }
            }
        } = this.props;

        // Envoie de la requete achievedCircuit
        api.post('achievedcircuit', {
            id_circuit: circuit.id_circuit,
            statut_circuit: 1,
            version: circuit.version,
            id_step: null,
            score: score,
            max_score: maxScore,
            achievedTime: time
        });
        navigate('Home');
    };

    render() {
        const {
            navigation: {
                state: {
                    params: { score, maxScore, time }
                }
            }
        } = this.props;

        let minutes = Math.floor(time);
        let sec = ((time - minutes) * 60).toFixed(0);

        return (
            <View style={styles.container}>
                <Text style={Object.assign({}, styles.text, styles.textBravo)}>
                    Bravo !
                </Text>
                <View>
                    <Text style={styles.text}>
                        Vous avez terminé le circuit en {minutes} minute
                        {minutes > 1 && 's'} et {sec} seconde
                        {sec > 1 && 's'} avec {score} points.
                    </Text>
                    {score < maxScore && (
                        <Text style={styles.text}>
                            Mais vous auriez pu avoir {maxScore} points.
                        </Text>
                    )}
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.finish}
                    activeOpacity={0.8}
                >
                    <Text style={styles.textButton}>Revenir sur la carte</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1abc9c',
        padding: 15,
        paddingTop: 40
    },
    textContainer: {
        alignItems: 'center'
    },
    textBravo: {
        fontSize: 35
    },
    text: {
        fontSize: 25,
        color: 'white',
        textAlign: 'center'
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
