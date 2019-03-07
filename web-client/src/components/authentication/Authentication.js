import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, ModalHeader } from 'reactstrap';

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
        const { login } = this.props;

        return (
            <>

                {isConnected ?
                    <Link to='/account'>
                        <FontAwesomeIcon icon='user' className='user-icon' />
                    </Link>
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
                                <Register displayModal={this.displayModal}
                                    modal={modal} login={login} />
                                :
                                <Connect displayModal={this.displayModal}
                                    modal={modal} login={login} />
                            }
                        </Modal>
                    </>
                }

            </>
        );
    }

}
