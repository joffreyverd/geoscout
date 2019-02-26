import React, {Component} from 'react';
import {Button, ModalBody, ModalFooter, Form, FormGroup,
    Label, Input, Modal, ModalHeader} from 'reactstrap';
import {withRouter} from 'react-router-dom';

class CreateCircuitModal extends Component {
    state = {
        name: '',
        description: '',
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
                            <FormGroup>
                                <Label>Description</Label>
                                <Input 
                                    type="text" 
                                    name="text"/>
                            </FormGroup>
                        </Form>
                    </ModalBody>

                    <ModalFooter>
                        <Button 
                            color="primary" 
                            onClick={this.displayModal}>Créer</Button>
                        <Button 
                            color="secondary" 
                            onClick={this.displayModal}>Annuler</Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

export default withRouter(CreateCircuitModal);
