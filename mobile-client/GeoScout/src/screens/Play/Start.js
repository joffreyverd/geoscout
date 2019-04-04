import React from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from  'react-native';

function Start(props) {
    const { navigation } = props;
    const { circuit } = navigation.state.params;
    return (
        <View>
            <Text>Tu veux Jouer ?</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate('Transit', { circuit: circuit, step: 0 })}
            >
                <Text>Commencer</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Start;