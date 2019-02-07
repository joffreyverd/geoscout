import React, {Component} from 'react';
import './css/app.css';
import {Route, withRouter} from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faIgloo, faCoffee, faUser } from '@fortawesome/free-solid-svg-icons'

import LandingPage from './containers/LandingPage';
import Home from './containers/LandingPage';

library.add(faIgloo, faCoffee, faUser)

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
                <AppRoute exact path = '/my-account' component = {LandingPage} />
            </>
        );
    }
}

export default withRouter(App);
