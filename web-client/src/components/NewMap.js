import React from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';

import Pin from './Pin';
import MAP_STYLE from '../utils/map-style-basic.json';

/* Map de création de circuits */
export default class NewMap extends React.Component {
    state= {
        viewport: {
            width: '100%',
            height: window.innerHeight -50,
            latitude: 48.582651,
            longitude: 7.749534,
            zoom: 12
        }
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
            <div className='new-map'>
                <ReactMapGL
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
                    {...this.state.viewport}
                    mapStyle={MAP_STYLE}
                    onViewportChange={(viewport) => this.setState({viewport})}
                    onClick={this.props.handleClick}
                    >
                    {this.state.userPosition &&
                        <Marker latitude={this.state.userPosition.latitude} 
                            longitude={this.state.userPosition.longitude}
                            offsetLeft={-10}
                            offsetTop={-20}>
                            <Pin color='red'/>
                        </Marker>
                    }
                    {this.props.steps && this.props.steps.map((s, idx) => 
                        <Marker key={idx}
                            latitude={s.latitude} 
                            longitude={s.longitude}
                            offsetLeft={-11}
                            offsetTop={-25}>
                            <Pin color='blue' onClick={() => this.props.removeMarker(idx)}/>
                        </Marker>
                    )}
                </ReactMapGL>
            </div>
        )
    }
}
