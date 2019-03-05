import React from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';

import Pin from './Pin';
import MAP_STYLE from '../utils/map-style-basic.json';

/* Map de la page home affichant les circuits à proximité */
export default class HomeMap extends React.Component {
    state= {
        viewport: {
            width: '100%',
            height: '100vh',
            latitude: 48.582651,
            longitude: 7.749534,
            zoom: 12
        },
        circuits: []
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


    render() {
        return (
            <div className='map'>
                <ReactMapGL
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
                    {...this.state.viewport}
                    mapStyle={MAP_STYLE}
                    onViewportChange={(viewport) => this.setState({viewport})}
                    >
                    {this.state.userPosition &&
                        <Marker latitude={this.state.userPosition.latitude} 
                            longitude={this.state.userPosition.longitude}
                            offsetLeft={-10}
                            offsetTop={-20}>
                            <Pin color='red'/>
                        </Marker>
                    }
                    {this.state.circuits && this.state.circuits.map((c, idx) => 
                        <Marker key={idx}
                            latitude={c.latitude} 
                            longitude={c.longitude}
                            offsetLeft={-11}
                            offsetTop={-25}>
                            <Pin color='blue' />
                        </Marker>
                    )}
                </ReactMapGL>
            </div>
        )
    }
}
