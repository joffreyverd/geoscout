import React, { Component } from 'react';

import Map from '../components/Map';
import api from '../utils/httpMethods';

export default class Home extends Component {

    state = {
        circuits: [],
    }

    componentDidMount() {
        api.get('circuit').then((data) => {
            this.setState({
                circuits: data,
            });
        });
    }

    render() {
        const { circuits } = this.state;

        return (
            <Map class='map' circuits={circuits} />
        );
    }

}
