import React, {Component} from 'react';
import './css/app.css';
import {Route, withRouter} from 'react-router-dom';

import LandingPage from './containers/LandingPage';
import Home from './containers/LandingPage';

const AppRoute = ({component : Component, ...props}) => {
    return (
        <Route { ...props } render = { props => (
            <div className='App'>
                <Component {...props} />
            </div>
        )} />
    );
}

class App extends Component {
    render() {
        return (
            <>
                <Route exact path = '/' component = {LandingPage} />
                <AppRoute exact path = '/home' component = {Home} />
            </>
        );
    }
}

export default withRouter(App);
