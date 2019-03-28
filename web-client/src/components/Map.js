import React from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

import Pin from './Pin';
import MAP_STYLE from '../utils/map-style-basic.json';

/* Map de création de circuits */
export default class Map extends React.Component {

    centerStep = (step) => {
        const { viewport, changeViewport } = this.props;
        viewport.latitude = step.latitude;
        viewport.longitude = step.longitude + 0.03;
        viewport.zoom = 12;
        changeViewport(viewport);
    }

    render() {
        const {
            steps, circuits, onClickMap, onClickMarker,
            className, viewport, userPosition, changeViewport,
        } = this.props;

        return (
            <div className={className}>
                <ReactMapGL
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
                    {...viewport}
                    mapStyle={MAP_STYLE}
                    onViewportChange={changeViewport}
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
                    {steps && steps.map(s => <Marker
                        key={s.id_step}
                        latitude={s.latitude}
                        longitude={s.longitude}
                        offsetLeft={-11}
                        offsetTop={-25}
                    >
                        <Pin
                            color='#1f7a1f'
                            index={s.order}
                            onClick={() => {
                                onClickMarker(s);
                                this.centerStep(s);
                            }}
                        />
                    </Marker>)}
                    { /* Affichage des circuits dans le cas de la map de la homepage */}
                    {circuits && circuits.map((c, idx) => {
                        if (c.Steps[0].latitude && c.Steps[0].longitude) {
                            return (
                                <Marker
                                    key={idx}
                                    latitude={c.Steps[0].latitude}
                                    longitude={c.Steps[0].longitude}
                                    offsetLeft={-11}
                                    offsetTop={-25}
                                >
                                    <Pin
                                        color='#0066cc'
                                        onClick={() => onClickMarker(c.id_circuit)}
                                    />
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
