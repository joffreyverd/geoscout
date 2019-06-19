import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Animated,
    Easing,
    Dimensions
} from 'react-native';

export default class Compass extends Component {
    constructor() {
        super();
        this.spinValue = new Animated.Value(0);
        this.state = {
            location: null,
            errorMessage: null,
            direction: null,
            truenoth: null
        };
    }

    componentDidMount() {
        this.setState({ interval: setInterval(this.getDirection, 1000) });
    }

    componentWillUnmount() {
        const { interval } = this.state;
        if (interval) {
            clearInterval(interval);
        }
    }

    componentDidUpdate() {
        this.spin();
    }

    getDirection = () => {
        const { userPosition, step } = this.props;
        let lat1 = userPosition.coords.latitude;
        let lat2 = step.latitude;
        let lon1 = userPosition.coords.longitude;
        let lon2 = step.longitude;

        dLat = ((lat2 - lat1) * Math.PI) / 180;
        dLon = ((lon2 - lon1) * Math.PI) / 180;
        bearing = (Math.atan2(dLon, dLat) * 180) / Math.PI;
        this.setState({ direction: userPosition.coords.heading - bearing });
    };

    spin = () => {
        let start = JSON.stringify(this.spinValue);
        let direction = Math.round(this.state.direction);

        let rot = +start;
        let rotM = rot % 360;

        if (rotM < 180 && direction > rotM + 180) rot -= 360;
        if (rotM >= 180 && direction <= rotM - 180) rot += 360;

        rot += direction - rotM;

        Animated.timing(this.spinValue, {
            toValue: rot,
            duration: 300,
            easing: Easing.easeInOut
        }).start();
    };

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
