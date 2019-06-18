import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Image,
    StyleSheet,
    Dimensions,
    Text
} from 'react-native';

const { width } = Dimensions.get('window');
const height = width * 0.5;

export default class Carousel extends Component {
    render() {
        const { images } = this.props;
        if (images && images.length) {
            return (
                <View style={styles.scrollContainer}>
                    <ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={true}
                    >
                        {images.map((image, index) => (
                            <Image
                                key={index}
                                style={styles.image}
                                source={{
                                    uri: `http://www.geoscout.fr:5555${image}`
                                }}
                            />
                        ))}
                    </ScrollView>
                    <Text style={styles.numberPhoto}>
                        {images.length > 1
                            ? `${images.length} photos`
                            : '1 photo'}
                    </Text>
                </View>
            );
        }
        return null;
    }
}

const styles = StyleSheet.create({
    scrollContainer: {
        height
    },
    image: {
        width: width - 30,
        height
    },
    numberPhoto: {
        fontSize: 12,
        color: '#2c3e50',
        textAlign: 'center'
    }
});
