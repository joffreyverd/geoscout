import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export default class Authentification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authentificationModal : true,
            isConnected : props.isConnected
        };

        this.displayModal = this.displayModal.bind(this);
      }

    displayModal() {
        this.setState((previousState) => ({
          modal : !previousState.modal
        }));
      }

  render() {
    return (
        <>
        
            <FontAwesomeIcon onClick={this.displayModal} icon='user' className='user-icon'/>

            <Modal isOpen={this.state.modal} fade={false} toggle={this.displayModal}>
                <ModalHeader toggle={this.displayModal}>Bienvenue :)</ModalHeader>

                <ModalBody>
                    Lorem ipsum dolor sit amet,
                    consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip
                    ex ea commodo consequat. Duis aute irure dolor
                    in reprehenderit in voluptate velit esse cillum
                    dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa
                    qui officia deserunt mollit anim id est laborum.
                </ModalBody>

                <ModalFooter>
                    <Button color="primary" onClick={this.displayModal}>S'inscrire</Button>{' '}
                    <Button color="secondary" onClick={this.displayModal}>Annuler</Button>
                </ModalFooter>
            </Modal>

        </>
    );
  }
}
