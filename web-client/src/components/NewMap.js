import React from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';

import Pin from './Pin';
import MAP_STYLE from '../utils/map-style-basic.json';

/* Map de création de circuits */
export default class NewMap extends React.Component {
    state= {
        viewport: {
            width: '70%',
            height: 600,
            latitude: 48.582651,
            longitude: 7.749534,
            zoom: 12
        },
        steps: []
    }
    
    componentDidMount() {
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

    handleClick = (event) => {
        let steps = this.state.steps
        steps.push({ longitude: event.lngLat[0], latitude: event.lngLat[1]})
        this.setState({ steps: steps})
    }

    removeMarker = (idx) => {
        // Suppression de l'étape dans la liste
        this.setState((prev) => {
            prev.steps.splice(idx,1)
            return { steps: prev.steps}
        })
    }

    render() {
        return (
            <div className='map'>
                <ReactMapGL
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
                    {...this.state.viewport}
                    mapStyle={MAP_STYLE}
                    onViewportChange={(viewport) => this.setState({viewport})}
                    onClick={this.handleClick}
                    >
                    {this.state.userPosition &&
                        <Marker latitude={this.state.userPosition.latitude} 
                            longitude={this.state.userPosition.longitude}
                            offsetLeft={-10}
                            offsetTop={-20}>
                            <Pin color='red'/>
                        </Marker>
                    }
                    {this.state.steps && this.state.steps.map((c, idx) => 
                        <Marker key={idx}
                            latitude={c.latitude} 
                            longitude={c.longitude}
                            offsetLeft={-11}
                            offsetTop={-25}>
                            <Pin color='blue' onClick={() => this.removeMarker(idx)}/>
                        </Marker>
                    )}
                </ReactMapGL>
            </div>
        )
    }
}
