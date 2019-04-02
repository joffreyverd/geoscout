import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faPen, faAlignJustify } from '@fortawesome/free-solid-svg-icons';

import './css/app-minifized.css';
import Navigation from './components/Navigation';

import Home from './views/Home';
import Account from './views/Account';
import CircuitsView from './views/CircuitsView';
import CircuitPublisher from './views/CircuitPublisher';
import Achievement from './views/Achievement';
import Todo from './views/Todo';
import DetailedCircuit from './views/DetailedCircuit';

import api from './utils/httpMethods';

library.add(faUser, faPen, faAlignJustify);

class App extends Component {

    state = {
        isConnected: false,
        user: {},
    }

    componentDidMount() {
        if (localStorage.getItem('token')) {
            api.get('whoami').then((data) => {
                this.setState({ user: data, isConnected: true });
            }).catch(() => {
                localStorage.removeItem('token');
                console.log('Oups, une erreur s\'est produite');
            });
        }
    }

    login = (route, credentials) => api.post(route, credentials).then((data) => {
        localStorage.setItem('token', data.token);
        this.setState({
            isConnected: true,
            user: data.user,
        });
    })

    logout = () => {
        localStorage.removeItem('token');
        this.setState({
            isConnected: false,
            user: {},
        });
    }

    render() {
        const { isConnected, user } = this.state;
        return (
            <>
                <div className='menu-wrapper'>
                    <Navigation isConnected={isConnected} login={this.login} logout={this.logout} />
                </div>

                <Route exact path='/' component={Home} />
                {isConnected ?
                    <>
                        <Route exact path='/account' render={props => <Account {...props} user={user} />} />
                        <Route exact path='/circuits' component={CircuitsView} />
                        <Route exact path='/circuit/:id' component={CircuitPublisher} />
                        <Route exact path='/achievements' component={Achievement} />
                        <Route exact path='/todo' component={Todo} />
                    </>
                    : null}
                <Route exact path='/detail/:id' component={DetailedCircuit} />
            </>
        );
    }

}

export default withRouter(App);
