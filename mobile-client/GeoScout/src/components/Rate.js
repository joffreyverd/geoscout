import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Icon } from 'react-native-elements';

export default function Rate(props) {
    const { rate } = props;
    const sizeIcon = 10;

    let rows = [];
    for (let i = 1; i < 6; i++) {
        if (Math.round(rate) >= i) {
            rows.push(
                <Icon
                    key={i}
                    name="star"
                    type="material"
                    size={sizeIcon}
                    color="#FFAE23"
                />
            );
        } else {
            rows.push(
                <Icon
                    key={i}
                    name="star-border"
                    type="material"
                    size={sizeIcon}
                    color="#FFAE23"
                />
            );
        }
    }
    return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
            {rows}
            <Text style={styles.rateText}> ({rate})</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    rateText: {
        color: '#2c3e50',
        fontSize: 8
    }
});
