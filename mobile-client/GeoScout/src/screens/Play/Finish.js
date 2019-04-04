import React from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';

export default function Finish(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Bravo.</Text>
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
        
    }
});