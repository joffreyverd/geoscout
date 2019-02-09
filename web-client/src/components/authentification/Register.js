import React, {Component} from 'react';
import {Button, ModalBody, ModalFooter, Form, FormGroup, Label, Input} from 'reactstrap';
import {withRouter} from 'react-router-dom';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            repeatPassword: '',
            modal : props.modal,
            displayModal : props.displayModal
        };
      }

    render() {
        return (
            <>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label>Nom</Label>
                            <Input 
                                type="text" 
                                name="lastname"/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Prénom</Label>
                            <Input 
                                type="text" 
                                name="firstname"/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input 
                                type="email" 
                                name="email" />
                        </FormGroup>

                        <Label>Mot de passe</Label>
                        <FormGroup>
                            <Input 
                                type="password" 
                                name="password" 
                                placeholder="Plus de 8 caractères" />
                        </FormGroup>
                        <FormGroup>
                            <Input 
                                type="password" 
                                name="password" 
                                placeholder="Répétez votre mot de passe" />
                        </FormGroup>
                    </Form>
                </ModalBody>

                <ModalFooter>
                    <Button 
                        color="primary" 
                        onClick={this.displayModal}>Inscription</Button>
                    <Button 
                        color="secondary" 
                        onClick={this.displayModal}>Annuler</Button>
                </ModalFooter>
            </>
        );
    }
}

export default withRouter(Register);
