import React, { Component } from 'react';
import {
    Button, ModalBody, ModalFooter, Form, FormGroup,
    Label, Input, Modal, ModalHeader,
} from 'reactstrap';


class UpdateStepModal extends Component {

    state = {
        name: '',
        description: '',
        instruction: ''
    };

    componentDidUpdate(prevProps) {
        if (prevProps.step !== this.props.step) {
            this.setState(this.props.step)
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = () => {
        const step = this.state;
        const { displayModal } = this.props;
        this.props.updateStep(step)
            .then(() => displayModal())
            .catch(error => console.log(error));
    }

    render() {
        const { name, description, instruction } = this.state;
        const { open, displayModal } = this.props;

        return (
            <>
                <Modal
                    isOpen={open}
                    fade={false}
                    toggle={displayModal}
                >
                    <ModalHeader>Modification de l'étape</ModalHeader>
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
                                    type='text'
                                    name='description'
                                    value={description}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Instruction</Label>
                                <Input
                                    type='text'
                                    name='instruction'
                                    value={instruction}
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

export default UpdateStepModal;
