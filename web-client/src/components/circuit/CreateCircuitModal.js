import React, { Component } from 'react';
import {
    Button, ModalBody, ModalFooter, Form, FormGroup,
    Label, Input, Modal, ModalHeader,
} from 'reactstrap';
import { withRouter } from 'react-router-dom';

import api from '../../utils/httpMethods';

class CreateCircuitModal extends Component {

    state = {
        name: '',
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = () => {
        const { name } = this.state;
        const { displayModal } = this.props;
        if (name.length > 1) {
            api.post('circuit', {
                name: name,
            }).then((data) => {
                displayModal();
                this.setState({ name: null });
                const { history } = this.props;
                history.push(`/circuit/${data.id_circuit}`);
            }).catch(() => {
                console.log('Oups, une erreur s\'est produite');
            });
        }
    }

    render() {
        const { name } = this.state;
        const { modal, displayModal } = this.props;

        return (
            <>
                <Modal
                    isOpen={modal}
                    fade={false}
                    toggle={displayModal}
                >
                    <ModalHeader>Nouveau circuit</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label>Nom</Label>
                                <Input
                                    type='text'
                                    name='name'
                                    value={name}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                        </Form>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            color='primary'
                            onClick={this.handleSubmit}
                        >Créer
                        </Button>
                        <Button
                            color='secondary'
                            onClick={displayModal}
                        >Annuler
                        </Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }

}

export default withRouter(CreateCircuitModal);
