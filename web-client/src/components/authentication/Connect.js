import React, { Component } from 'react';
import { Button, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { withRouter } from 'react-router-dom';

class Connect extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            modal: props.modal,
            displayModal: props.displayModal
        };
    }

    render() {
        return (
            <>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                name="email"
                                placeholder="Saisissez votre email" />
                        </FormGroup>
                        <FormGroup>
                            <Label>Mot de passe</Label>
                            <Input
                                type="password"
                                name="password"
                                placeholder="Saisissez votre mot de passe" />
                        </FormGroup>
                    </Form>
                </ModalBody>

                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={this.displayModal}>Connexion</Button>
                    <Button
                        color="secondary"
                        onClick={this.displayModal}>Annuler</Button>
                </ModalFooter>
            </>
        );
    }
}

export default withRouter(Connect);
