import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from  'react-native';
import { SafeAreaView } from 'react-navigation';

function Start(props) {
    const { navigation } = props;
    const { circuit } = navigation.state.params;
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Le circuit {circuit.name} est chargé !</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate('Transit', { circuit: circuit, step: 0, score: 0, maxScore: 0 })}
                activeOpacity={0.8}
                style={styles.button}
            >
            {console.log(circuit)}
                <Text style={styles.textButton}>Aller au point de départ</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Start;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    },
    title: {
        textAlign: 'center',
        color: '#2c3e50',
        fontSize: 28,
        marginBottom: 30,
        fontWeight: 'bold'
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