import React, {Component} from 'react';
import {Button, ModalBody, ModalFooter, Form, FormGroup,
    Label, Input, Modal, ModalHeader} from 'reactstrap';
import {withRouter, Link} from 'react-router-dom';

class CreateCircuitModal extends Component {
    state = {
        name: ''
    };

    render() {
        return (
            <>
                <Modal 
                    isOpen={this.props.modal}
                    fade={false}
                    toggle={this.props.displayModal}>
                    <ModalHeader>Nouveau circuit</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label>Nom</Label>
                                <Input 
                                    type="text"
                                    name="text"/>
                            </FormGroup>
                        </Form>
                    </ModalBody>

                    <ModalFooter>
                        <Link to={{pathname:'/new-circuit', state:{name:this.state.name}}}>
                            <Button 
                                color="primary" 
                                onClick={this.displayModal}>Créer</Button>
                        </Link>
                        <Button 
                            color="secondary" 
                            onClick={this.props.displayModal}>Annuler</Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

export default withRouter(CreateCircuitModal);
