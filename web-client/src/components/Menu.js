import React from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';

import Authentication from './authentication/Authentication';

export default class Menu extends React.Component {

    state = {
        isConnected: true,
        responsiveNavBarMode: false,
    }

    toggle = () => {
        this.setState(previousState => ({
            responsiveNavBarMode: !previousState.responsiveNavBarMode,
        }));
    }

    render() {
        const { isConnected, responsiveNavBarMode } = this.state;

        return (
            <div>
                <Navbar expand='md'>

                    <Link to='/'>
                        <img src='/img/logo.png' className='logo' alt='GeoScout' />
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
                                    <Link to='/' onClick={() => this.setState({ isConnected: false })}>Déconnexion</Link>
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
                                    <Authentication isConnected={isConnected} />
                                </NavItem>
                            </Nav>
                        </Collapse>
                    }

                </Navbar>
            </div>
        );
    }

}
