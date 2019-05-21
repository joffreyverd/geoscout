import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    Button, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input,
} from 'reactstrap';


class ProfilEdition extends Component {

    state = {}

    lol = () => {
        console.log('lol');
    }

    render() {

        const { user } = this.props;

        return (
            <>
                <div className='feed-wrapper'>
                    <h2>Editer mon profil</h2>

                    <Form onSubmit={this.handleSubmit}>
                        <ModalBody>
                            <FormGroup>
                                <Label>{user.firstname}</Label>
                                <Input
                                    type='text'
                                    name='text'
                                    value='Joffrey'
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>{user.lastname}</Label>
                                <Input
                                    type='text'
                                    name='text'
                                    value='Verd'
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>{user.email}</Label>
                                <Input
                                    type='text'
                                    name='text'
                                    value='jverd@protonmail.com'
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Téléphone</Label>
                                <Input
                                    type='text'
                                    name='text'
                                    value='06 51 82 16 69'
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Ville</Label>
                                <Input
                                    type='text'
                                    name='text'
                                    value='Strasbourg'
                                />
                            </FormGroup>
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                color='primary'
                                type='submit'
                                onClick={this.lol}
                            >Enregistrer
                            </Button>
                        </ModalFooter>
                    </Form>
                </div>
            </>
        );
    }

}

export default withRouter(ProfilEdition);
