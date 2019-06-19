import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, ModalHeader } from 'reactstrap';
import { Menu, Dropdown, Button } from 'antd';
import 'antd/dist/antd.css';

import Connect from './Connect';
import Register from './Register';

export default class Authentication extends React.Component {

    state = {
        modal: false,
        registerByDefault: true,
    };


    displayModal = () => {
        this.setState(previousState => ({
            modal: !previousState.modal,
        }));
    }

    render() {
        const { modal, registerByDefault } = this.state;
        const { login, logout, isConnected } = this.props;

        const userOptions = (
            <Menu>
                <Menu.Item>
                    <Link to='/account'>Mon compte</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to='/' onClick={logout}>Déconnexion</Link>
                </Menu.Item>
            </Menu>
        );

        return (
            <>

                {isConnected ?

                    <Dropdown overlay={userOptions} id='dropdown'>
                        <span className='ant-dropdown-link'>
                            <FontAwesomeIcon icon='user' className='user-icon' />
                        </span>
                    </Dropdown>

                    :

                    <>

                        <Button
                            onClick={this.displayModal}
                            className='auth-text'
                        >Authentification
                        </Button>

                        <Modal isOpen={modal} fade={false} toggle={this.displayModal}>

                            <div className='modal-header'>
                                <ModalHeader
                                    className={registerByDefault === true ? 'active' : ''}
                                    onClick={() => this.setState({ registerByDefault: true })}
                                >Inscription
                                </ModalHeader>
                                <ModalHeader
                                    className={registerByDefault === true ? '' : 'active'}
                                    onClick={() => this.setState({ registerByDefault: false })}
                                >Connexion
                                </ModalHeader>
                            </div>

                            {registerByDefault ?
                                <Register
                                    displayModal={this.displayModal}
                                    modal={modal}
                                    login={login}
                                />
                                :
                                <Connect
                                    displayModal={this.displayModal}
                                    modal={modal}
                                    login={login}
                                />
                            }
                        </Modal>
                    </>
                }

            </>
        );
    }

}
