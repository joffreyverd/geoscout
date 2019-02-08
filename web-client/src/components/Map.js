import React from 'react';
import ReactMapGL from 'react-map-gl';

export default class Map extends React.Component {
    state= {
        viewport: {
            width: 400,
            heigth: 400,
            latitude: 37.7577,
            longitude: -122.4376,
            zoom: 8
        }
    }
    render() {
        return <ReactMapGL
            mapboxApiAccessToken={'pk.eyJ1IjoidHVudGVyZmluZ2VyIiwiYSI6ImNqcncxOTkwdDA3YW00M3BrY3A0MTAyd3kifQ.Mby6nOzqK6Tkzm1CwRfdDw'}
            {...this.state.viewport}
            onViewportChange={(viewport) => this.setState({viewport})}
        />
    }
}