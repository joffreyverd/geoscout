import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Rate from './Rate';
import api from '../config/httpMethods';

export default class Comment extends Component {
    state = {};

    async componentDidMount() {
        try {
            const {
                user: { id_user }
            } = this.props;
            const img = await api.post('download', {
                id: id_user,
                type: 'user'
            });
            this.setState({ img });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const {
            user: { lastname, firstname },
            comment,
            rate,
            version,
            date,
            styleComment
        } = this.props;
        const { img } = this.state;
        let dateSplit = new Date(date).toLocaleDateString().split('/');
        const dateComment = `${dateSplit[1]}/${dateSplit[0]}/${dateSplit[2]}`;

        return (
            <View style={styleComment}>
                <View style={[styles.inline, { marginBottom: 5 }]}>
                    <Image
                        source={
                            !img || img.length < 1
                                ? require('../../utils/img/userAnonymous.png')
                                : {
                                      uri: `http://www.geoscout.fr:5555${img}`
                                  }
                        }
                        style={styles.image}
                    />
                    <View>
                        <Text style={[styles.name, { marginRight: 10 }]}>
                            {lastname} {firstname}
                        </Text>
                        <Rate rate={rate} size={14} displayNumber={false} />
                    </View>
                </View>
                <Text style={styles.comment}>{comment}</Text>
                <Text style={{ color: 'grey', fontSize: 10 }}>
                    Version: {version} | {dateComment}
                </Text>
            </View>
        );
    }
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
    },
    image: {
        width: 35,
        height: 35,
        borderRadius: 35 / 2,
        marginRight: 10
    }
});
