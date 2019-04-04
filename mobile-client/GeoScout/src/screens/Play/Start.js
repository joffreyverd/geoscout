import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from  'react-native';

function Start(props) {
    const { navigation } = props;
    const { circuit } = navigation.state.params;
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Le circuit {circuit.name} est chargé !</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate('Transit', { circuit: circuit, step: 0, score: 0 })}
                activeOpacity={0.8}
                style={styles.button}
            >
                <Text style={styles.textButton}>Aller au point de départ</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Start;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    text: {
        color: '#2c3e50',
        fontSize: 24,
        marginBottom: 30
    },
    button: {
        backgroundColor: '#2c3e50',
        borderRadius: 5,
        padding: 8,
        marginBottom: 5,
        width: '80%',
        alignItems: 'center'
    },
    textButton: {
        color: '#fff',
        fontSize: 18
    }
});