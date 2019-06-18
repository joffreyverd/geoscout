import React from 'react';
import { StyleSheet, ActivityIndicator, Text } from 'react-native';

export default function Loading() {
    return (
        <>
            <Text style={styles.loading}>Chargement</Text>
            <ActivityIndicator size="large" color="#1abc9c" />
        </>
    );
}

//Feuille de style
const styles = StyleSheet.create({
    loading: {
        textAlign: 'center',
        color: '#2c3e50',
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 15,
        marginTop: 60
    }
});
