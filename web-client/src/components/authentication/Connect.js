import React, { Component } from 'react';
import { Button, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { withRouter } from 'react-router-dom';


class Connect extends Component {

    constructor(props) {
        super(props);
        const { login } = this.props;
        this.state = {
            email: '',
            password: '',
        };
        ({ displayModal } = this.props);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit = () => {
        this.props.login('signin', this.state).then(() => {
            this.displayModal();
        }).catch((error) => {
            console.log(error);
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
                                type='email'
                                name='email'
                                placeholder='Saisissez votre email'
                                value={email}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Mot de passe</Label>
                            <Input
                                type='password'
                                name='password'
                                placeholder='Saisissez votre mot de passe'
                                value={password}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>

                <ModalFooter>
                    <Button
                        color='primary'
                        onClick={this.handleSubmit}
                    >Connexion
                    </Button>
                    <Button
                        color='secondary'
                        onClick={this.displayModal}
                    >Annuler
                    </Button>
                </ModalFooter>
            </>
        );
    }

}

export default withRouter(Connect);
