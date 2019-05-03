import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import api from '../../config/httpMethods';


export default function Finish(props) {

    const { 
        navigation: { 
            navigate,
            state: {
                params: {
                    circuit,
                    score,
                    maxScore
                }
            }
        }
    } = props;

    const finish = () => {
        // Envoie de la requete achievedCircuit
        api.post('achievedcircuit', {
            id_circuit: circuit.id_circuit,
            statut_circuit: 1,
            version: circuit.version,
            id_step: null,
            score: score,
            max_score: maxScore
        })
        navigate('Home');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Bravo.</Text>
            <Text style={styles.text}>Vous avez {score} points.</Text>
            { score < maxScore &&
                <Text style={styles.text}>Mais vous auriez pu avoir {maxScore} points.</Text>
            }
            <TouchableOpacity
                style={styles.button}
                onPress={finish}
                activeOpacity={0.8}
            >
                <Text style={styles.textButton}>Revenir sur la carte</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 35
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
});