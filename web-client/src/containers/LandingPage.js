import React, { Component } from 'react';

export default class LandingPage extends Component {
    state = {
            option: false,
        };

    validateForm(email, password) {
        return email.length > 0 && password.length > 0;
    }

    render() {
        return (
            <>
                <h1>Landing Page</h1>
            </>
        );
    }
}
