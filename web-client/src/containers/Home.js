import React, { Component } from 'react';
import '../css/app.css';

import Map from '../components/Map'

export default class Home extends Component {

    render() {
        return (
            <>
                <h1>Home Page</h1>
                <Map/>
                
            </>
        );
    }
}
