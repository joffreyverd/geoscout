import React, { Component } from 'react';
import '../css/app.css';

import Map from '../components/Map'

export default class Home extends Component {
    state = {
        circuits: []
    }
    render() {
        const { circuits } = this.state;

        return (
            <Map class='map' circuits={circuits} />
        );
    }
}
