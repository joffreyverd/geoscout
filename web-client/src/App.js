import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faPlusCircle, faPen } from '@fortawesome/free-solid-svg-icons';

import './css/app.css';
import Menu from './components/Menu';

import Home from './views/Home';
import Account from './views/Account';
import CreatedCircuit from './views/CreatedCircuit';
import NewCircuit from './views/NewCircuit';
import Achievement from './views/Achievement';

import api from './utils/httpMethods';

library.add(faUser, faPlusCircle, faPen);

class App extends Component {

    state = {
        isConnected: false,
        user: {},
    }

    componentDidMount() {
        if (localStorage.getItem('token')) {
            api.get('whoami').then((data) => {
                this.setState({ user: data, isConnected: true });
            }).catch((error) => {
                console.log(error);
                localStorage.removeItem('token');
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
                    <Menu isConnected={isConnected} login={this.login} logout={this.logout} />
                </div>

                <Route exact path='/' component={Home} />
                {isConnected ?
                    <>
                        <Route exact path='/account' render={props => <Account {...props} user={user} />} />
                        <Route exact path='/circuits' component={CreatedCircuit} />
                        <Route exact path='/circuit/:id' component={NewCircuit} />
                        <Route exact path='/achievements' component={Achievement} />
                    </>
                    : null}
            </>
        );
    }

}

export default withRouter(App);
