import React, { Component } from 'react';
import { Button } from 'reactstrap';

import Map from '../components/Map';
import api from '../utils/httpMethods';
import CircuitsView from './CircuitsView';

export default class Home extends Component {

    state = {
        circuits: [],
        value: false,
        isAdmin: 'home',
        viewport: {
            width: '100%',
            height: window.innerHeight - 50,
            latitude: 48.582651,
            longitude: 7.749534,
            zoom: 12,
        },
    }

    DISTANCE = 30;

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
        this.getCircuits();
    }

    getCircuits = () => {
        const { viewport: { longitude, latitude } } = this.state;
        const body = {
            user_longitude: longitude,
            user_latitude: latitude,
            distance: this.DISTANCE,
        };
        api.post('circuit/nearby', body).then((data) => {
            this.setState({
                circuits: data,
            });
        }).catch(() => {
            console.log('Oups, une erreur s\'est produite');
        });
    }

    changeViewport = (viewport) => {
        this.setState({
            viewport: viewport,
        });
    }

    onMapMouv = (event) => {
        this.getCircuits();
    }

    onClickItem = (id_circuit) => {
        const { history } = this.props;
        if (id_circuit) {
            history.push(`detail/${id_circuit}`);
        }
    }

    changeViewStyle = () => {
        this.setState(prevState => ({
            value: !prevState.value,
        }));
    }

    render() {
        const { circuits, value, isAdmin, viewport, userPosition } = this.state;

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
                        onMapMouv={this.onMapMouv}
                        onClickMarker={this.onClickItem}
                    />
                    :
                    <CircuitsView
                        isAdmin={isAdmin}
                        circuits={circuits}
                    />
                }

                <Button
                    className='toggle-button'
                    color='primary'
                    type='submit'
                    value={value}
                    onClick={this.changeViewStyle}
                >{(value) ? 'Voir la carte' : 'Voir la liste'}
                </Button>
            </>
        );
    }

}
