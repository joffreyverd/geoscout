import React, {Component} from 'react';
import './css/app.css';
import Menu from './components/NavBar';
import {Route, withRouter} from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import Home from './containers/Home';
import Authentification from './components/authentification/Authentification';
import CreatedCircuit from './containers/CreatedCircuit';
import AchievedCircuits from './containers/AchievedCircuit';

library.add(faUser)

const AppRoute = ({component : Component, ...props}) => {
    return (
        <Route {...props} render = {props => (
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

                <div className='body-wrapper'>
                    <Menu/>
                </div>

                <Route exact path = '/' component = {Home} />
                <AppRoute exact path = '/authentification' component = {Authentification} />
                <AppRoute exact path = '/circuits' component = {CreatedCircuit} />
                <AppRoute exact path = '/achieved-circuits' component = {AchievedCircuits} />
            </>
        );
    }
}

export default withRouter(App);
