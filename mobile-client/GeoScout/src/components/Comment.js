import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Rate from './Rate';

export default function Comment(props) {
    const { nameUser, comment, rate, version, date, styleComment } = props;
    let dateFormat = new Date(date);
    let dateSplit = dateFormat.toLocaleDateString().split('/');
    const dateComment = `${dateSplit[1]}/${dateSplit[0]}/${dateSplit[2]}`;
    return (
        <View style={styleComment}>
            <View style={styles.inline}>
                <Text style={[styles.name, { marginRight: 10 }]}>
                    {nameUser}
                </Text>
                <Text style={{ color: 'grey' }}>{dateComment}</Text>
            </View>
            <Rate rate={rate} size={14} displayNumber={false} />
            <Text style={styles.comment}>{comment}</Text>
            <Text style={{ color: 'grey', fontSize: 10 }}>
                Version: {version}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    name: {
        color: '#1abc9c',
        fontSize: 14,
        fontWeight: 'bold'
    },
    comment: {
        color: '#2c3e50',
        fontSize: 12
    },
    inline: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
});
