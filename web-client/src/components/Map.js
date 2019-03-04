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
            zoom: 12
        }
    }

    componentDidMount() {
        // Récupération de la position de l'utilisateur
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((data) => {
                let viewport = this.state.viewport
                viewport.latitude = data.coords.latitude
                viewport.longitude = data.coords.longitude

                this.setState({
                    viewport: viewport,
                    userPosition: data.coords
                })
            })
        }
    }

    render() {
        const { steps, circuits } = this.props

        return (
            <div className={this.props.class}>
                <ReactMapGL
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
                    {...this.state.viewport}
                    mapStyle={MAP_STYLE}
                    onViewportChange={(viewport) => this.setState({ viewport })}
                    onClick={this.props.handleClick}
                >
                    {this.state.userPosition &&
                        <Marker latitude={this.state.userPosition.latitude}
                            longitude={this.state.userPosition.longitude}
                            offsetLeft={-10}
                            offsetTop={-20}>
                            <Pin color='#cc0000' />
                        </Marker>
                    }
                    { /* Affichage des étapes dans le cas de la création/update de circuit */}
                    {steps && steps.map((s, idx) =>
                        <Marker key={idx}
                            latitude={s.latitude}
                            longitude={s.longitude}
                            offsetLeft={-11}
                            offsetTop={-25}>
                            <Pin color='#1f7a1f' onClick={() => this.props.removeMarker(idx)} />
                        </Marker>
                    )}
                    { /* Affichage des circuits dans le cas de la map de la homepage */}
                    {circuits && circuits.map((c, idx) =>
                        <Marker key={idx}
                            latitude={c.latitude}
                            longitude={c.longitude}
                            offsetLeft={-11}
                            offsetTop={-25}>
                            <Pin color='#0066cc' />
                        </Marker>
                    )}
                </ReactMapGL>
            </div>
        )
    }
}
