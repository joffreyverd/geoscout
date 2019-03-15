import React from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

import Pin from './Pin';
import MAP_STYLE from '../utils/map-style-basic.json';

/* Map de création de circuits */
export default class Map extends React.Component {

    state = {
        viewport: {
            width: '100%',
            height: window.innerHeight - 50,
            latitude: 48.582651,
            longitude: 7.749534,
            zoom: 12,
        },
    }

    componentDidMount() {
        // Récupération de la position de l'utilisateur
        if (navigator.geolocation) {
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
    }

    centerStep = (step) => {
        const { viewport } = this.state;
        viewport.latitude = step.latitude;
        viewport.longitude = step.longitude + 0.03;
        viewport.zoom = 12;

        this.setState({
            viewport: viewport,
        });
    }

    render() {
        const {
            steps, circuits, onClickMap, onClickMarker, className,
        } = this.props;
        const { viewport, userPosition } = this.state;

        return (
            <div className={className}>
                <ReactMapGL
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
                    {...viewport}
                    mapStyle={MAP_STYLE}
                    onViewportChange={viewport => this.setState({ viewport })}
                    onClick={onClickMap}
                >
                    {userPosition &&
                        <Marker
                            latitude={userPosition.latitude}
                            longitude={userPosition.longitude}
                            offsetLeft={-10}
                            offsetTop={-20}
                        >
                            <Pin color='#cc0000' />
                        </Marker>
                    }
                    { /* Affichage des étapes dans le cas de la création/update de circuit */}
                    {steps && steps.map((s) => <Marker
                        key={s.id_step}
                        latitude={s.latitude}
                        longitude={s.longitude}
                        offsetLeft={-11}
                        offsetTop={-25}
                    >
                        <Pin color='#1f7a1f' index={s.order} onClick={() => {
                            onClickMarker(s);
                            this.centerStep(s);
                        }} />
                    </Marker>)}
                    { /* Affichage des circuits dans le cas de la map de la homepage */}
                    {circuits && circuits.map((c, idx) => {
                        if (c.latitude && c.longitude) {
                            return (
                                <Marker
                                    key={idx}
                                    latitude={c.latitude}
                                    longitude={c.longitude}
                                    offsetLeft={-11}
                                    offsetTop={-25}
                                >
                                    <Pin color='#0066cc' onClick={() => onClickMarker(c)} />
                                </Marker>
                            );
                        }
                        return null;
                    })}
                </ReactMapGL>
            </div>
        );
    }

}
