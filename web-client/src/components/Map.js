import React from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';

import Pin from '../components/Pin';
import MAP_STYLE from '../utils/map-style-basic.json';

export default class Map extends React.Component {
    state= {
        viewport: {
            width: '80%',
            height: 600,
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

                this.setState({ viewport: viewport, userPosition: data.coords })
            })
        }
    }

    render() {
        return (
            <div className='map'>
                <ReactMapGL
                    mapboxApiAccessToken={'pk.eyJ1IjoidHVudGVyZmluZ2VyIiwiYSI6ImNqcncxOTkwdDA3YW00M3BrY3A0MTAyd3kifQ.Mby6nOzqK6Tkzm1CwRfdDw'}
                    {...this.state.viewport}
                    mapStyle={MAP_STYLE}
                    onViewportChange={(viewport) => this.setState({viewport})}
                    >
                    {this.state.userPosition &&
                        <Marker latitude={this.state.userPosition.latitude} 
                            longitude={this.state.userPosition.longitude}>
                            <Pin />
                        </Marker>
                    }
                </ReactMapGL>
            </div>
        )
    }
}