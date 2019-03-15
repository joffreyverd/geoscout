import React, { Component } from 'react';
import {
    Button, ModalBody, ModalFooter,
    Form, FormGroup, FormFeedback, Label, Input
} from 'reactstrap';
import { withRouter } from 'react-router-dom';


class Connect extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            error: undefined
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.login('signin', this.state).catch((error) => {
            console.log(error);
            if (error.code === 401)
                this.setState({ error: error.text })
        });
    }

    render() {

        const { email, password, error } = this.state;
        const { displayModal } = this.props;

        return (
            <Form onSubmit={this.handleSubmit}>
                <ModalBody>
                    <FormGroup>
                        <Label>Email</Label>
                        <Input
                            type='email'
                            name='email'
                            placeholder='Indiquez votre email'
                            value={email}
                            onChange={this.handleChange}
                            invalid={error}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Mot de passe</Label>
                        <Input
                            type='password'
                            name='password'
                            placeholder='Indiquez votre mot de passe'
                            value={password}
                            onChange={this.handleChange}
                            invalid={error}
                        />
                        <FormFeedback>{error}</FormFeedback>
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Button
                        color='primary'
                        type='submit'
                        onClick={this.handleSubmit}
                    >Connexion
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

export default withRouter(Connect);
