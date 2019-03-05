import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faPlusCircle } from '@fortawesome/free-solid-svg-icons'

import './css/app.css';
import Menu from './components/NavBar';

import Home from './containers/Home';
import Account from './containers/Account';
import Authentication from './components/authentication/Authentication';
import CreatedCircuit from './containers/CreatedCircuit';
import NewCircuit from './containers/NewCircuit';
import Achievement from './containers/Achievement';

library.add(faUser, faPlusCircle);

class App extends Component {
    render() {
        return (
            <>
                <div className='menu-wrapper'>
                    <Menu />
                </div>

                <Route exact path='/' component={Home} />
                <Route exact path='/account' component={Account} />
                <Route exact path='/authentication' component={Authentication} />
                <Route exact path='/circuits' component={CreatedCircuit} />
                <Route exact path='/circuit/:name' component={NewCircuit} />
                <Route exact path='/achievements' component={Achievement} />
            </>
        );
    }
}

export default withRouter(App);
