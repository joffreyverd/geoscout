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
import {mapStyle} from '../../utils/style/mapStyle';

const {width,height} = Dimensions.get('window')
const ASPECT_RATIO = width/height
const LATITUDE_DELTA = 0.5
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export default class GeoLocation extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            ready: false,
            error: null,
            initialPosition: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0
            },
            markerPosition: {
                latitude: 0,
                longitude: 0
            }
        }
    }

    componentDidMount() {
        if(this.askServiceEnable()){
            //fetch requete all circuit dans un rayon
        }else{
            this.askPermissionLocation();
        }
    }

    updateLocation = (location) => {
        let initialRegion = {
            latitude: parseFloat(location.coords.latitude),
            longitude: parseFloat(location.coords.longitude),
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        }

        this.setState({
            ready: true,
            error: null,
            initialPosition: initialRegion,
            markerPosition: initialRegion
        })
        console.log(this.state);
    }

    askServiceEnable = async () => {
        let statusService = await Location.hasServicesEnabledAsync();
        console.log(statusService);
        if(statusService){
            let location = await Location.getCurrentPositionAsync({});
            this.updateLocation(location);
        }else{
            return false;
        }
    }

    askPermissionLocation = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status === 'granted') {
            let location = await Location.getCurrentPositionAsync({});
            this.updateLocation(location);
        }else{
            this.setState({
                error: "La location n'est pas autorisée sur le périphérique."
            })
        }
    }  

    componentWillUnmount() {
        //Je ne sais pas si c'est encore utile !
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
                            source={require('../../utils/img/logoGeoScoutWhite.png')}
                            />
                            <ActivityIndicator style={styles.loaderMargin} size='large' color='#fff'/>
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
        borderRadius: 25,
        overflow: 'hidden',
        backgroundColor: 'rgba(0,122,255,0.1)',
        borderWidth: 1,
        borderColor: 'rgba(0,112,255,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
        
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