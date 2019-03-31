import React from 'react';
import {
    ActivityIndicator,
    Text,
    StyleSheet,
    View,
    Dimensions,
    Image,
    TouchableWithoutFeedback,
    Modal
} from 'react-native';
import { Location } from 'expo';
import { Icon } from 'react-native-elements';

import api from '../config/httpMethods';
import MapView from 'react-native-maps';
import {mapStyle} from '../../utils/style/mapStyle';

const {width,height} = Dimensions.get('window')
const ASPECT_RATIO = width/height
const LATITUDE_DELTA = 0.5
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class GeoLocation extends React.Component{
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
            },
            circuits: null,
            circuitReady: false
        }
    }

    componentDidMount() {
        console.log('hey beach');
        this.checkLocation().then(() => {
            this.getCircuits();
        }).catch((error) => console.log(error));
    }

    getCircuits = () => {
        const { markerPosition: { longitude, latitude } } = this.state;
        const body = {
            user_longitude: longitude,
            user_latitude: latitude,
            distance: 30,
        };
        api.post('circuit/nearby', body).then((data) => {
            this.setState({
                circuits: data,
                circuitReady: true
            });
        }).catch((error) => {
            console.log(error);
        });
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

    checkLocation = async () => {
        return Location.requestPermissionsAsync().then(async () => {
            let locationEnabled = await Location.hasServicesEnabledAsync();
            if (locationEnabled) {
                let location = await Location.getCurrentPositionAsync({});
                this.updateLocation(location);
            } else {
                this.setState({
                    error: "La localisation n'est pas activée sur le périphérique."
                })
            }
        }).catch(() => {
            this.setState({
                error: "La localisation n'est pas autorisée sur le périphérique."
            });
        });
    }

    componentWillUnmount() {
        //Je ne sais pas si c'est encore utile !
        navigator.geolocation.clearWatch(this.state)
    }

    displayModalCircuit(visible, item) {
        <TouchableWithoutFeedback onPress={() => visible = false}>
            <Modal
            isVisible = {visible}
            style={styles.modalBottom}>
                <TouchableWithoutFeedback onPress={() => (
                    visible = false,
                    navigation.navigate('DetailCircuit', item)
                )}>
                    <Text style={styles.big}>{item.name}</Text>
                    <Icon name='star' type='font-awesome' size={10} color='yellow'/>
                </TouchableWithoutFeedback>
            </Modal>
        </TouchableWithoutFeedback>
    }

    displayNearbyCircuits(){
        const { circuits } = this.state;
        return circuits.map((item) => {
            let latLongCircuit = {
                latitude: parseFloat(item.Steps[0].latitude),
                longitude: parseFloat(item.Steps[0].longitude)
            }
            return (
                <MapView.Marker coordinate={latLongCircuit}
                onPress={() => {
                    const visible = true;
                    this.displayModalCircuit(visible, item);
                }}>
                    <View style={styles.markerCircuit}>
                        <Text style={styles.c}>C</Text>
                    </View>
                </MapView.Marker>
            );
        });
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
                            <MapView.Marker coordinate={this.state.markerPosition}>
                                <View style={styles.radius}>
                                    <View style={styles.marker}>
                                    </View>
                                </View>
                            </MapView.Marker>
                            {(this.state.circuitReady)?
                                this.displayNearbyCircuits()
                            :
                                <ActivityIndicator style={styles.loaderMargin} size='large' color='#1abc9c'/>
                            }
                        </MapView> 
                    :
                        <>
                            <Image
                                style={{width: (width*0.8), height: (height*0.1)}}
                                source={require('../../utils/img/logoGeoScoutGreen.png')}
                            />
                            <ActivityIndicator style={styles.loaderMargin} size='large' color='#1abc9c'/>
                        </>
                    )
                )}
            </View>
        );
    }
}

export default GeoLocation;

const styles = StyleSheet.create({
    radius: {
        height: 30,
        width: 30,
        borderRadius: 15,
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
    markerCircuit: {
        height: 30,
        width: 30,
        borderWidth: 0,
        borderColor: '#2c3e50',
        borderRadius: 30/2,
        overflow: 'hidden',
        backgroundColor: '#1abc9c',
        alignItems: 'center',
        justifyContent: 'center',
    },
    c: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
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
    },
    modalBottom: {
        justifyContent: 'flex-end',
        margin: 0,
    }
});