import React from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';

import Authentication from './authentication/Authentication';

export default class Menu extends React.Component {

    state = {
        responsiveNavBarMode: false
    }

    toggle = () => {
        this.setState(previousState => ({
            responsiveNavBarMode: !previousState.responsiveNavBarMode,
        }));
    }

    render() {
        const { responsiveNavBarMode } = this.state;
        const { isConnected, login, logout } = this.props;

        return (
            <div>
                <Navbar expand='md'>

                    <Link to='/'>
                        <img src='/img/logoGeoScoutWhite.png' className='logo' alt='GeoScout' />
                    </Link>
                    <NavbarToggler onClick={this.toggle} />

                    {isConnected ?
                        <Collapse responsiveNavBarMode={responsiveNavBarMode} navbar>
                            <Nav className='ml-auto' navbar>
                                <NavItem>
                                    <Link to='/circuits'>Mes circuits</Link>
                                </NavItem>
                                <NavItem>
                                    <Link to='/achievements'>Accomplissements</Link>
                                </NavItem>
                                <NavItem>
                                    <Link to='/' onClick={logout}>Déconnexion</Link>
                                </NavItem>
                                <NavItem>
                                    <Authentication isConnected={isConnected} />
                                </NavItem>
                            </Nav>
                        </Collapse>

                        :
                        <Collapse responsiveNavBarMode={responsiveNavBarMode} navbar>
                            <Nav className='flex-end' navbar>
                                <NavItem>
                                    <Authentication isConnected={isConnected} login={login} />
                                </NavItem>
                            </Nav>
                        </Collapse>
                    }

                </Navbar>
            </div>
        );
    }

}
