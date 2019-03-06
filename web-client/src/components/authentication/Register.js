import React, { Component } from 'react';
import { Button, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { withRouter } from 'react-router-dom';

import api from '../../utils/httpMethods'

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            repeatPassword: ''
        };
    }
    
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    
    handleSubmit = () => {
        // Copie du state dans un nouvel objet pour pouvoir supprimer des propriétés
        let user = Object.assign({}, this.state);
        delete user.repeatPassword;
        
        api.post('signup', user).then((data) => {
            //success
        }).catch((error) => {
            //error
        });
        
    }

    render() {
        const { firstname, lastname, email, password, repeatPassword } = this.state;
        
        return (
            <>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label>Nom</Label>
                            <Input
                                type="text"
                                name="lastname"
                                onChange={ this.handleChange }
                                value={ lastname } />
                        </FormGroup>
                        <FormGroup>
                            <Label>Prénom</Label>
                            <Input
                                type="text"
                                name="firstname"
                                onChange={ this.handleChange }
                                value={ firstname } />
                        </FormGroup>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                name="email"
                                onChange={ this.handleChange }
                                value={ email } />
                        </FormGroup>

                        <Label>Mot de passe</Label>
                        <FormGroup>
                            <Input
                                type="password"
                                name="password"
                                placeholder="Plus de 8 caractères"
                                onChange={ this.handleChange }
                                value={ password } />
                        </FormGroup>
                        <FormGroup>
                            <Input
                                type="password"
                                name="repeatPassword"
                                placeholder="Répétez votre mot de passe"
                                onChange={ this.handleChange }
                                value={ repeatPassword } />
                        </FormGroup>
                    </Form>
                </ModalBody>

                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={this.props.displayModal}>Inscription</Button>
                    <Button
                        color="secondary"
                        onClick={this.props.displayModal}>Annuler</Button>
                </ModalFooter>
            </>
        );
    }
}

export default withRouter(Register);
