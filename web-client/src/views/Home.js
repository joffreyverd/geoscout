import React, { Component } from 'react';

import Map from '../components/Map';
import api from '../utils/httpMethods';

export default class Home extends Component {

    state = {
        circuits: [],
    }

    /*
    componentDidMount() {
        // api.get('circuits').then((data) => {
        //     this.setState({
        //         circuits: data,
        //     });
        // }).catch(error => {
        //     console.log(error);
        // })
    }
    */

    render() {
        const { circuits } = this.state;

        return (
            <Map class='map' circuits={circuits} />
        );
    }

}
