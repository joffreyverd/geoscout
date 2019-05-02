import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

export default function Finish(props) {

    const { 
        navigation: { 
            navigate,
            state: {
                params: {
                    circuit,
                    score
                }
            }
        }
    } = props;
    console.log(score);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Bravo.</Text>
            <Text style={styles.text}>Vous avez {score} points.</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigate('Home')}
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
        fontSize: 45
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