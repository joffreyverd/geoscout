import React from 'react';
import {
    Collapse, Navbar, NavbarToggler, Dropdown, Button,
    Nav, NavItem, DropdownMenu, DropdownItem, DropdownToggle,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import Authentication from './authentication/Authentication';
import CreateCircuitModal from './circuit/CreateCircuitModal';

export default class Menu extends React.Component {

    state = {
        responsiveNavBarMode: false,
        modal: false,
    }

    toggle = () => {
        this.setState(previousState => ({
            responsiveNavBarMode: !previousState.responsiveNavBarMode,
        }));
    }

    displayModal = () => {
        this.setState(previousState => ({
            modal: !previousState.modal,
        }));
    }

    render() {
        const { responsiveNavBarMode, modal } = this.state;
        const { isConnected, login, logout } = this.props;

        return (
            <div>
                <Navbar expand='md' fixed='top'>
                    <Link to='/'>
                        <img src='/img/logoGeoScoutWhite.png' className='logo' alt='GeoScout' />
                    </Link>
                    <NavbarToggler onClick={this.toggle} />

                    {isConnected ?
                        <Collapse responsiveNavBarMode={responsiveNavBarMode} navbar>
                            <Nav className='ml-auto' navbar>
                                <Dropdown nav>
                                    <DropdownToggle nav caret>
                                        Circuits
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <Link to='/circuits'>
                                            <DropdownItem>Créés</DropdownItem>
                                        </Link>
                                        <Link to='/achievements'>
                                            <DropdownItem>Réalisés</DropdownItem>
                                        </Link>
                                        <Link to='/todo'>
                                            <DropdownItem>Ma liste</DropdownItem>
                                        </Link>
                                        <DropdownItem divider />
                                        <DropdownItem
                                            onClick={this.displayModal}
                                            className='create-circuit'
                                        >Créer circuit
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                                <Authentication isConnected={isConnected} logout={logout} />
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

                <CreateCircuitModal
                    displayModal={this.displayModal}
                    modal={modal}
                />

            </div>
        );
    }

}
