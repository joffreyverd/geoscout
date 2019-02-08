import React, { Component } from 'react';
import Menu from '../components/Menu';
import Map from '../components/Map';
import '../css/app.css';

export default class LandingPage extends Component {
    state = {
            option: false,
        };

    validateForm(email, password) {
        return email.length > 0 && password.length > 0;
    }

    render() {
        return (
            <div className='body-wrapper'>
                <Menu/>
                <Map />
            </div>
            
        );
    }
}
