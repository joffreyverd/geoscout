import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    Animated,
    Easing,
    Dimensions
} from 'react-native';
import * as Location from 'expo-location';
import getCompassDirection from 'geolib';

export default class Compass extends Component {
    constructor() {
        super();
        this.spinValue = new Animated.Value(0);
        this.state = {
            location: null,
            errorMessage: null,
            heading: null,
            truenoth: null
        };
    }

    componentDidMount() {
        this._getLocationAsync();
    }

    componentDidUpdate() {
        this.spin();
    }

    _getLocationAsync = async () => {
        const {
            userPostion: { latitude, longitude }
        } = this.props;

        getCompassDirection(user => {
            let heading = obj.magHeading;
            this.setState({ heading: heading });
        });
    };

    spin() {
        let start = JSON.stringify(this.spinValue);
        let heading = Math.round(this.state.heading);

        let rot = +start;
        let rotM = rot % 360;

        if (rotM < 180 && heading > rotM + 180) rot -= 360;
        if (rotM >= 180 && heading <= rotM - 180) rot += 360;

        rot += heading - rotM;

        Animated.timing(this.spinValue, {
            toValue: rot,
            duration: 300,
            easing: Easing.easeInOut
        }).start();
    }

    render() {
        let LoadingText = 'Loading...';
        let display = LoadingText;

        if (this.state.errorMessage) display = this.state.errorMessage;

        const spin = this.spinValue.interpolate({
            inputRange: [0, 360],
            outputRange: ['-0deg', '-360deg']
        });

        display = Math.round(JSON.stringify(this.spinValue));

        if (display < 0) display += 360;
        if (display > 360) display -= 360;

        return (
            <View style={styles.container}>
                <Animated.Image
                    resizeMode="contain"
                    source={require('../../utils/img/arrow.png')}
                    style={{
                        width: deviceWidth * 0.5,
                        height: deviceHeight * 0.5,
                        transform: [{ rotate: spin }]
                    }}
                />
            </View>
        );
    }
}

// Device dimensions so we can properly center the images set to 'position: absolute'
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
