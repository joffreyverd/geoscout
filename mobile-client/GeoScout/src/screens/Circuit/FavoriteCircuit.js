import React from 'react';
import {
    Text,
    StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-navigation';

export default class FavoriteCircuit extends React.Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>En construction</Text>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginRight: 10,
        marginLeft: 10,
        marginTop: 25
    },
    title: {
        color: '#1abc9c',
        fontWeight: 'bold',
        fontSize: 26        
    }
});
