import React, { Component } from 'react';
import { Button, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { withRouter } from 'react-router-dom';

import api from '../../utils/httpMethods';

class Register extends Component {

    state = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        repeatPassword: '',
    };


    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit = () => {
        // Copie du state dans un nouvel objet pour pouvoir supprimer des propriétés
        const user = Object.assign({}, this.state);
        delete user.repeatPassword;

        api.post('signup', user).then((data) => {
            // success
        }).catch((error) => {
            // error
        });

    }

    render() {
        const { firstname, lastname, email, password, repeatPassword } = this.state;
        const { displayModal } = this.props;
        return (
            <>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label>Nom</Label>
                            <Input
                                type='text'
                                name='lastname'
                                onChange={this.handleChange}
                                value={lastname}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Prénom</Label>
                            <Input
                                type='text'
                                name='firstname'
                                onChange={this.handleChange}
                                value={firstname}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input
                                type='email'
                                name='email'
                                onChange={this.handleChange}
                                value={email}
                            />
                        </FormGroup>

                        <Label>Mot de passe</Label>
                        <FormGroup>
                            <Input
                                type='password'
                                name='password'
                                placeholder='Plus de 8 caractères'
                                onChange={this.handleChange}
                                value={password}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input
                                type='password'
                                name='repeatPassword'
                                placeholder='Répétez votre mot de passe'
                                onChange={this.handleChange}
                                value={repeatPassword}
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>

                <ModalFooter>
                    <Button
                        color='primary'
                        onClick={displayModal}
                    >Inscription
                    </Button>
                    <Button
                        color='secondary'
                        onClick={displayModal}
                    >Annuler
                    </Button>
                </ModalFooter>
            </>
        );
    }

}

export default withRouter(Register);
