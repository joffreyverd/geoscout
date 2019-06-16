import React, { Component } from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const height = width * 0.45;

export default class Carousel extends Component {
    render() {
        const { images } = this.props;
        if (images && images.length) {
            return (
                <View style={styles.scrollContainer}>
                    <ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
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
    }
});
