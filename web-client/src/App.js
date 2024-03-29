import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faPen, faAlignJustify } from '@fortawesome/free-solid-svg-icons';

import './css/app-minified.css';
import Navigation from './components/Navigation';

import Home from './views/Home';
import Account from './views/Account';
import Circuits from './views/Circuits';
import CircuitPublisher from './views/CircuitPublisher';
import Achievement from './views/Achievement';
import Todo from './views/Todo';
import DetailedCircuit from './views/DetailedCircuit';
import Administration from './views/Administration';

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
                    <Navigation
                        isConnected={isConnected}
                        isAdmin={user && user.is_admin !== undefined && user.is_admin}
                        login={this.login}
                        logout={this.logout}
                    />
                </div>

                <Route exact path='/' component={Home} />
                {isConnected ?
                    <>
                        <Route exact path='/administration' component={Administration} />
                        <Route exact path='/account' render={props => <Account {...props} user={user} myPage />} />
                        <Route exact path='/circuits' component={Circuits} />
                        <Route exact path='/circuit/:id' component={CircuitPublisher} />
                        <Route exact path='/achievements' component={Achievement} />
                        <Route exact path='/todo' component={Todo} />
                    </>
                    : null}
                <Route exact path='/detail/:id' render={props => <DetailedCircuit {...props} isConnected={isConnected} />} />
                <Route exact path='/account/:id' render={props => <Account {...props} user={user} myPage={false} />} />
            </>
        );
    }

}

export default withRouter(App);
