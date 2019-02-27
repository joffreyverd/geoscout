import React from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';

import Pin from '../components/Pin';
import MAP_STYLE from '../utils/map-style-basic.json';

export default class Map extends React.Component {
    state= {
        viewport: {
            width: '70%',
            height: 600,
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

    handleClick = (event) => {
        let circuits = this.state.circuits
        circuits.push({ longitude: event.lngLat[0], latitude: event.lngLat[1]})
        this.setState({ circuits: circuits})
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
                            longitude={this.state.userPosition.longitude}>
                            <Pin color='red'/>
                        </Marker>
                    }
                    {this.state.circuits && this.state.circuits.map((c) => 
                        <Marker latitude={c.latitude} 
                            longitude={c.longitude}>
                            <Pin color='blue'/>
                        </Marker>
                    )}
                </ReactMapGL>
            </div>
        )
    }
}
