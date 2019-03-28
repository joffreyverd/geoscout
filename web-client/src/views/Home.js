import React, { Component } from 'react';
import ToggleButton from 'react-toggle-button';

import Map from '../components/Map';
import api from '../utils/httpMethods';
import CircuitsView from './CircuitsView';

export default class Home extends Component {

    state = {
        circuits: [],
        value: false,
        onHome: true,
        viewport: {
            width: '100%',
            height: window.innerHeight - 50,
            latitude: 48.582651,
            longitude: 7.749534,
            distance: 30,
            zoom: 12,
        },
    }

    componentDidMount() {
        // Récupération de la position de l'utilisateur
        // eslint-disable-next-line no-undef
        if (navigator.geolocation) {
            // eslint-disable-next-line no-undef
            navigator.geolocation.getCurrentPosition((data) => {
                const { viewport } = this.state;
                viewport.latitude = data.coords.latitude;
                viewport.longitude = data.coords.longitude;

                this.setState({
                    viewport: viewport,
                    userPosition: data.coords,
                });
            });
        }
        const { viewport: { longitude, latitude, distance } } = this.state;
        const body = {
            user_longitude: longitude,
            user_latitude: latitude,
            distance: distance,
        };
        api.post('circuit/nearby', body).then((data) => {
            this.setState({
                circuits: data,
            });
        }).catch((error) => {
            console.log(error);
        });
    }

    changeViewport = (viewport) => {
        this.setState({
            viewport: viewport,
        });
    }

    onClickItem = (id_circuit) => {
        const { history } = this.props;
        if (id_circuit) {
            history.push(`detail/${id_circuit}`);
        }
    }

    render() {
        const { circuits, value, onHome, viewport, userPosition } = this.state;

        return (
            <>
                {value === false
                    ?
                    <Map
                        className='map'
                        circuits={circuits}
                        viewport={viewport}
                        userPosition={userPosition}
                        changeViewport={this.changeViewport}
                        onClickMarker={this.onClickItem}
                    />
                    :
                    <CircuitsView
                        onHome={onHome}
                        circuits={circuits}
                    />
                }

                <div className='toggle-button'>
                    <p>Liste</p>
                    <ToggleButton
                        value={value || false}
                        onToggle={(value) => {
                            this.setState({
                                value: !value,
                            });
                        }}
                    />
                </div>
            </>
        );
    }

}
