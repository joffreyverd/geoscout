import React, { Component } from 'react';
import {
    Button, ModalBody, ModalFooter, Form, FormGroup,
    Label, Input, Modal, ModalHeader
} from 'reactstrap';
import { withRouter } from 'react-router-dom';

import api from '../../utils/httpMethods';

class CreateCircuitModal extends Component {
    state = {
        name: ''
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = () => {
        api.post('circuit', this.state.name).then(name => {
            this.props.displayModal();
            const { history } = this.props;
            history.push(`circuit/${this.state.name}`);
        }).catch(error =>
            console.log(error)
        );
    }

    render() {
        const { name } = this.state;

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
                                    type='text'
                                    name='name'
                                    value={name}
                                    onChange={this.handleChange} />
                            </FormGroup>
                        </Form>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            color='primary' onClick={this.handleSubmit}>Créer</Button>
                        <Button
                            color='secondary'
                            onClick={this.props.displayModal}>Annuler</Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

export default withRouter(CreateCircuitModal);
