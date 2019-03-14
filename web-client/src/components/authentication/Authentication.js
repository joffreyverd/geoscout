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
            dropdownOpen: false,
        };
    }

    displayModal = () => {
        this.setState(previousState => ({
            modal: !previousState.modal,
        }));
    }

    displayDropdownAccount = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
        });
    }

    render() {
        const { isConnected, modal, registerByDefault, dropdownOpen } = this.state;
        const { login, logout } = this.props;

        return (
            <>

                {isConnected ?
                    <Dropdown
                        nav
                        direction='left'
                        isOpen={dropdownOpen}
                        toggle={this.displayDropdownAccount}
                    >

                        <DropdownToggle nav>
                            <FontAwesomeIcon icon='user' className='user-icon' />
                        </DropdownToggle>
                        <DropdownMenu>
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
                        <FontAwesomeIcon onClick={this.displayModal} icon='user' className='user-icon' />

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
