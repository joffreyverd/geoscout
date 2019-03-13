import React from 'react';
import {
    ActivityIndicator,
    Text,
    StyleSheet,
    View,
    Dimensions,
    Image
} from 'react-native';
import {
    Permissions,
    Location
} from 'expo';
import MapView from 'react-native-maps';
import {mapStyle} from './style/mapStyle';

const {width,height} = Dimensions.get('window')
const ASPECT_RATIO = width/height
const LATITUDE_DELTA = 0.5
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export default class GeoLocation extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            initialPosition: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0
            },
            markerPosition: {
                latitude: 0,
                longitude: 0
            },            
        }
        this.watchID = null
    }

    componentDidMount() {
        this.findCurrentLocation();
        // let geoOptions = {
        //     enableHighAccuracy: true,
        //     timeOut: 20000,
        //     maximumAge: 14400
        // };

        // navigator.geolocation.getCurrentPosition( 
        //     this.geoSuccess, 
        //     this.geoFailure,
        //     geoOptions
        // );

        let option = {
            accuracy: Location.Accuracy.Highest,
            timeInterval: 1000,
            distanceInterval: 5            
        }

        this.watchID = Location.watchPositionAsync(option, callBack);
    }

    findCurrentLocation = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status === 'granted') {
            let location = await Location.getCurrentPositionAsync({});
            console.log(location);
        }else{
            this.setState({
                error: "La location n'est pas autorisée sur le périphérique."
            })
        }
    }

    geoSuccess = (position) => {
        var initialRegion = {
            latitude: parseFloat(position.coords.latitude),
            longitude: parseFloat(position.coords.longitude),
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        }

        this.setState({
            ready: true,
            error: null,
            initialPosition: initialRegion,
            markerPosition: initialRegion
        })
    }

    geoFailure = (error) => {
        this.setState({error: error.message});
    }    

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.state)
    }

    render() {
        return (
            <View style={styles.container}>
                {((this.state.error)? 
                    <Text style={styles.errorText}>{this.state.error}</Text> 
                :
                    ((this.state.ready)? 
                        <MapView 
                        style={styles.map}
                        region={this.state.initialPosition}
                        customMapStyle={mapStyle}>
                            <MapView.Marker
                            coordinate={this.state.markerPosition}>
                                <View style={styles.radius}>
                                    <View style={styles.marker}>
                                    </View>
                                </View>
                            </MapView.Marker>
                        </MapView> 
                    :
                        <>
                            <Image
                            style={{width: (width*0.8), height: (height*0.1)}}
                            source={require('./img/logoGeoScoutWhite.png')}
                            />
                            <ActivityIndicator style={styles.loaderMargin} size='large' color='#fff' />
                        </>
                    )
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    radius: {
        height: 50,
        width: 50,
        borderRadius: 50/2,
        overflow: 'hidden',
        backgroundColor: 'rgba(0,122,255,0.1)',
        borderWidth: 1,
        borderColor: 'rgba(0,112,255,0.3)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    marker: {
        height: 20,
        width: 20,
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 20/2,
        overflow: 'hidden',
        backgroundColor: '#007aff'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1abc9c'
    },
    map: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute'
    },
    big: {
        color: '#8e44ad',
        textAlign: 'center',
        fontSize: 36
    },
    loaderMargin: {
        marginTop: 70
    },
    errorText: {
        fontSize: 24,
        textAlign: 'center',
        color: '#2c3e50'
    }
});