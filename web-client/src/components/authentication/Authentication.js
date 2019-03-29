import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Modal, ModalHeader, DropdownToggle,
    DropdownMenu, DropdownItem, Dropdown,
} from 'reactstrap';

import Connect from './Connect';
import Register from './Register';

export default class Authentication extends React.Component {

    constructor(props) {
        super(props);
        const { isConnected } = this.props;
        this.state = {
            modal: false,
            registerByDefault: true,
            isConnected: isConnected,
        };
    }

    displayModal = () => {
        this.setState(previousState => ({
            modal: !previousState.modal,
        }));
    }

    render() {
        const { isConnected, modal, registerByDefault } = this.state;
        const { login, logout } = this.props;

        return (
            <>

                {isConnected ?
                    <Dropdown
                        nav
                        toggle={this.displayDropdownAccount}
                    >

                        <DropdownToggle nav>
                            <FontAwesomeIcon icon='user' className='user-icon' />
                        </DropdownToggle>
                        <DropdownMenu className='account-dropdown'>
                            <Link to='/account'>
                                <DropdownItem>Mon compte</DropdownItem>
                            </Link>
                            <Link to='/' onClick={logout}>
                                <DropdownItem>Déconnexion</DropdownItem>
                            </Link>
                        </DropdownMenu>
                    </Dropdown>
                    :
                    <>
                        <p onClick={this.displayModal} className='auth-text'>Authentification</p>

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
