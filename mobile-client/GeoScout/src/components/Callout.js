import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Icon } from 'react-native-elements';
import Rate from './Rate';
import Difficulty from './Difficulty';

export default function Callout(props) {
    const {
        name,
        description,
        rate,
        distance,
        time,
        difficulty,
        order,
        styleCallout,
        callBy
    } = props;
    let descriptionPlanText = '';
    if (description != null && description !== undefined && description != '') {
        descriptionPlanText = description.replace(/<br\s*[\/]?>/gi, '. ');
        descriptionPlanText = descriptionPlanText.replace(/(<([^>]+)>)/gi, '');
    } else if (callBy == 'list' && description == null) {
        descriptionPlanText = 'Pas de description disponible sur ce circuit.';
    }
    const sizeIcon = 12;
    const timeHour = Math.floor(time / 60);
    const timeMinute = time % 60;
    return (
        <View style={styleCallout}>
            {name ? (
                <Text style={styles.name} numberOfLines={1}>
                    {name}
                </Text>
            ) : null}
            {descriptionPlanText ? (
                <Text style={styles.description} numberOfLines={2}>
                    {descriptionPlanText}
                </Text>
            ) : null}
            {rate ? <Rate rate={rate} /> : null}
            <View style={styles.inline}>
                {distance ? (
                    <>
                        <Icon
                            name="directions-walk"
                            type="material"
                            size={sizeIcon}
                            color="#2c3e50"
                        />
                        <Text style={styles.item}>{distance}km</Text>
                    </>
                ) : null}
                {time ? (
                    <>
                        <Icon
                            name="access-time"
                            type="material"
                            size={sizeIcon}
                            color="#2c3e50"
                        />
                        <Text style={styles.item}>
                            {timeHour}h{timeMinute}m
                        </Text>
                    </>
                ) : null}
                {difficulty ? (
                    <View>
                        <Difficulty difficulty={difficulty} />
                    </View>
                ) : null}
                {order ? (
                    <View>
                        <Text style={styles.item}>
                            {order.orderStep}/{order.maxOrderStep} étapes
                        </Text>
                    </View>
                ) : null}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    name: {
        color: '#1abc9c',
        fontSize: 18,
        fontWeight: 'bold'
    },
    description: {
        color: '#2c3e50',
        fontSize: 12
    },
    item: {
        color: '#95a5a6',
        fontSize: 12,
        marginRight: 8,
        marginLeft: 1
    },
    inline: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
});
