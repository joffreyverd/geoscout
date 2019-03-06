import React, { Component } from 'react';
import { Button, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { withRouter } from 'react-router-dom';

import api from '../../utils/httpMethods';

class Connect extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = () => {
        api.post('signin', this.state).then((data) => {
            //gestion du token
            this.props.displayModal();
        }).catch((error) => {
            // Gestion d'erreur
        });
    }

    render() {
        const { email, password } = this.state;

        return (
            <>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                name="email"
                                placeholder="Saisissez votre email"
                                value={ email }
                                onChange={ this.handleChange } />
                        </FormGroup>
                        <FormGroup>
                            <Label>Mot de passe</Label>
                            <Input
                                type="password"
                                name="password"
                                placeholder="Saisissez votre mot de passe"
                                value={ password }
                                onChange={ this.handleChange } />
                        </FormGroup>
                    </Form>
                </ModalBody>

                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={this.props.displayModal}>Connexion</Button>
                    <Button
                        color="secondary"
                        onClick={this.prosp.displayModal}>Annuler</Button>
                </ModalFooter>
            </>
        );
    }
}

export default withRouter(Connect);
