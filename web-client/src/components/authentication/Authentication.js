import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal, ModalHeader } from 'reactstrap';

import Connect from './Connect';
import Register from './Register';

export default class Authentication extends React.Component {

    state = {
        modal: false,
        register: true,
        isConnected: this.props.isConnected
    };

    displayModal = () => {
        this.setState((previousState) => ({
            modal: !previousState.modal
        }));
    }

    render() {
        const { register } = this.props;

        return (
            <>

                {this.state.isConnected ?
                    <Link to='/account'>
                        <FontAwesomeIcon icon='user' className='user-icon' />
                    </Link>
                    :
                    <>
                        <FontAwesomeIcon onClick={this.displayModal} icon='user' className='user-icon' />

                        <Modal isOpen={this.state.modal} fade={false} toggle={this.displayModal}>

                            <div className='modal-header'>
                                <ModalHeader
                                    className={register === true ? 'active' : ''}
                                    onClick={() => this.setState({ register: true })}
                                >Inscription</ModalHeader>
                                <ModalHeader
                                    className={register === true ? '' : 'active'}
                                    onClick={() => this.setState({ register: false })}
                                >Connexion</ModalHeader>
                            </div>

                            {this.state.register ?
                                <Register displayModal={this.displayModal} modal={this.state.modal} />
                                :
                                <Connect displayModal={this.displayModal} modal={this.state.modal} />
                            }
                        </Modal>
                    </>
                }

            </>
        );
    }
}
