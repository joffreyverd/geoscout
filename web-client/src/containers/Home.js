import React, { Component } from 'react';
import '../css/app.css';

import Map from '../components/Map'

export default class Home extends Component {

    render() {
        return (
            <>
                <h1>Accueil</h1>
                <Map/>
                
            </>
        );
    }
}
