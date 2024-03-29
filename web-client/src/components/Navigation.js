import React from 'react';
import { Collapse, Navbar, Nav } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Menu, Dropdown } from 'antd';
import 'antd/dist/antd.css';

import Authentication from './authentication/Authentication';
import CreateCircuitModal from './circuit/CreateCircuitModal';

export default class Navigation extends React.Component {

    state = {
        modal: false,
    }

    displayModal = () => {
        this.setState(previousState => ({
            modal: !previousState.modal,
        }));
    }

    render() {
        const { modal } = this.state;
        const { isConnected, isAdmin, login, logout } = this.props;

        const circuitOptions = (
            <Menu>
                <Menu.Item>
                    <Link to='/circuits'>Créés</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to='/achievements'>Réalisés</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to='/todo'>Favoris</Link>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item>
                    <p
                        onClick={this.displayModal}
                        className='create-circuit'
                    >Créer un circuit
                    </p>
                </Menu.Item>
            </Menu>
        );

        return (
            <div>
                <Navbar expand='md' fixed='top'>
                    <Link to='/'>
                        <img src='/img/logoGeoScoutWhite.png' className='logo' alt='GeoScout' />
                    </Link>

                    {isConnected ?
                        <Collapse navbar>
                            <Nav className='ml-auto' navbar>

                                {isAdmin ?
                                    <div>
                                        <Dropdown overlay={circuitOptions} id='dropdown'>
                                            <span className='ant-dropdown-link'>Mes circuits</span>
                                        </Dropdown>


                                        <Link
                                            to='/administration'
                                            className='administration-button'
                                        >Administration
                                        </Link>
                                    </div>
                                    :

                                    <Dropdown overlay={circuitOptions} id='dropdown'>
                                        <span className='ant-dropdown-link'>Mes circuits</span>
                                    </Dropdown>
                                }

                                <Authentication isConnected={isConnected} logout={logout} />

                            </Nav>
                        </Collapse>

                        :

                        <Collapse navbar>
                            <Nav className='flex-end' navbar>

                                <Authentication isConnected={isConnected} login={login} />

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
