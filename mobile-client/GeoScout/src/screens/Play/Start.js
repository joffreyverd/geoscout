import React from 'react';
import { View, Text } from  'react-native';

function Start(props) {
    const { circuit } = props.navigation.state.params;
    return (
        <View>
            <Text>Tu veux Jouer ?</Text>
        </View>
    )
}

export default Start;