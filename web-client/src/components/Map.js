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
            className, viewport, userPosition, changeViewport, onMapMouv,
        } = this.props;
        const step = (this.props.step) ? this.props.step : false;

        return (
            <div className={className}>
                <ReactMapGL
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
                    {...viewport}
                    mapStyle={MAP_STYLE}
                    onViewportChange={changeViewport}
                    onMouseUp={onMapMouv}
                    onClick={onClickMap}
                >
                    {userPosition &&
                        <Marker
                            latitude={userPosition.latitude}
                            longitude={userPosition.longitude}
                            offsetLeft={-10}
                            offsetTop={-20}
                        >
                            <svg viewBox='0 0 192 192' width='24px' height='24px'><g fill='none' fillRule='nonzero' stroke='none' strokeWidth='1' strokeLinecap='butt' strokeLinejoin='miter' strokeMiterlimit='10' strokeDasharray='' strokeDashoffset='0' fontFamily='none' fontWeight='none' fontSize='none' textAnchor='none'><path d='M0,192v-192h192v192z' fill='none' /><g fill='#e74c3c'><path d='M96,16c-44.184,0 -80,35.816 -80,80c0,44.184 35.816,80 80,80c44.184,0 80,-35.816 80,-80c0,-44.184 -35.816,-80 -80,-80zM135.32813,52.26562c2.91615,-0.33884 5.42587,2.71088 4.04687,5.67188l-23.39062,50.28125c-1.592,3.424 -4.34162,6.17362 -7.76562,7.76562l-50.28125,23.39062c-3.384,1.576 -6.8885,-1.9285 -5.3125,-5.3125l23.39062,-50.28125c1.592,-3.416 4.34162,-6.17362 7.76562,-7.76562l50.28125,-23.39062c0.42301,-0.197 0.84903,-0.31097 1.26563,-0.35938zM96,87.20313c-4.88,0 -8.79687,3.91687 -8.79687,8.79687c0,4.88 3.91687,8.79687 8.79687,8.79687c4.88,0 8.79687,-3.91687 8.79687,-8.79687c0,-4.88 -3.91687,-8.79687 -8.79687,-8.79687z' /></g></g></svg>
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

                    {step &&
                        <Marker
                            latitude={step.latitude}
                            longitude={step.longitude}
                            offsetLeft={-10}
                            offsetTop={-20}
                        >
                            <Pin color='#0066cc' />
                        </Marker>
                    }
                    { /* Affichage des circuits dans le cas de la map de la homepage */}
                    {circuits && circuits.map((c, idx) => {
                        if (c != null && c.Steps[0].latitude && c.Steps[0].longitude) {
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
