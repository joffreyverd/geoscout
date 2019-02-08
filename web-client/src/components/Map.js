import React from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';

import Pin from '../components/Pin';
import MAP_STYLE from '../utils/map-style-basic.json';

export default class Map extends React.Component {
    state= {
        viewport: {
            width: 400,
            height: 400,
            latitude: 48.530379,
            longitude: 7.736656,
            zoom: 8
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
                    <Marker latitude={48.530379} longitude={7.736656}><Pin /></Marker>
                </ReactMapGL>
            </div>
        )
    }
}