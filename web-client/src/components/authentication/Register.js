import React, { Component } from 'react';
import {
    Button, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input, FormFeedback,
} from 'reactstrap';
import { withRouter } from 'react-router-dom';

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
            [`verif${event.target.name}`]: undefined,
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {
            email,
            password,
            repeatPassword,
        } = this.state;


        // Vérification du format d'email
        if (!email.match(/^[\w-.]+@[\w-]+\.\w+$/g)) {
            this.setState({ verifemail: true });
        } else if (password.length < 8) {
            this.setState({ verifpassword: true });
        } else if (repeatPassword !== password) {
            this.setState({ verifrepeatPassword: true });
        } else {
            // Copie du state dans un nouvel objet pour pouvoir supprimer des propriétés
            const user = Object.assign({}, this.state);
            delete user.repeatPassword;

            this.props.login('signup', user).then((data) => {
                // success
            }).catch((error) => {
                // error
            });
        }

    }

    render() {
        const { firstname, lastname, email, password, repeatPassword,
            verifemail, verifpassword, verifrepeatPassword } = this.state;
        const { displayModal } = this.props;

        return (
            <Form onSubmit={this.handleSubmit}>
                <ModalBody>
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
                            invalid={verifemail}
                        />
                        <FormFeedback>Ce n'est pas une adresse valide</FormFeedback>
                    </FormGroup>

                    <FormGroup>
                        <Label>Mot de passe</Label>
                        <Input
                            type='password'
                            name='password'
                            placeholder='8 caractères minimum'
                            onChange={this.handleChange}
                            value={password}
                            invalid={verifpassword}
                        />
                        <FormFeedback>Votre mot de passe doit faire plus de 8 caractères</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type='password'
                            name='repeatPassword'
                            placeholder='Répétez votre mot de passe'
                            onChange={this.handleChange}
                            value={repeatPassword}
                            invalid={verifrepeatPassword}
                        />
                        <FormFeedback>Vos mots de passes ne correspondent pas</FormFeedback>
                    </FormGroup>

                </ModalBody>

                <ModalFooter>
                    <Button
                        color='primary'
                        type='submit'
                        onClick={this.handleSubmit}
                    >Inscription
                    </Button>
                    <Button
                        color='secondary'
                        onClick={displayModal}
                    >Annuler
                    </Button>
                </ModalFooter>
            </Form>
        );
    }

}

export default withRouter(Register);
