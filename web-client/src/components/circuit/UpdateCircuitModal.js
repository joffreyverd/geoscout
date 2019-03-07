import React, { Component } from 'react';
import {
    Button, ModalBody, ModalFooter, Form, FormGroup,
    Label, Input, Modal, ModalHeader,
} from 'reactstrap';

class UpdateCircuitModal extends Component {

    state = {
        name: '',
        description: '',
        length: '',
        duration: '',
    };

    componentDidUpdate(prevProps) {
        const { circuit } = this.props;
        if (prevProps.circuit !== circuit) {
            if (circuit) {
                this.setState(Object.assign({}, circuit, {
                    description: circuit.description || '',
                    instruction: circuit.instruction || '',
                    length: circuit.length || '',
                    duration: circuit.duration || '',
                }));
            }
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = () => {
        const { name, description, length, duration } = this.state;
        let circuit = {
            name: name || undefined,
            description: description || description,
            length: length || undefined,
            duration: duration || undefined
        }
        const { displayModal } = this.props;
        this.props.updateCircuit(circuit)
            .then(() => displayModal())
            .catch(error => console.log(error));
    }

    render() {
        const { name, description, length, duration } = this.state;
        const { open, displayModal } = this.props;

        return (
            <>
                <Modal
                    isOpen={open}
                    fade={false}
                    toggle={displayModal}
                >
                    <ModalHeader>Modification du circuit</ModalHeader>
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

                            <FormGroup>
                                <Label>Description</Label>
                                <Input
                                    type='textarea'
                                    name='description'
                                    value={description}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Distance moyenne</Label>
                                <Input
                                    type='text'
                                    name='length'
                                    value={length}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Durée moyenne</Label>
                                <Input
                                    type='text'
                                    name='duration'
                                    value={duration}
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

export default UpdateCircuitModal;
