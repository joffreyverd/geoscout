import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    Button, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input,
} from 'reactstrap';


class ProfilEdition extends Component {

    state = {}

    render() {

        const { user } = this.props;

        return (
            <>
                <div className='feed-wrapper'>
                    <h2>Editer mon profil</h2>

                    <Form onSubmit={this.handleSubmit}>
                        <ModalBody>
                            <FormGroup>
                                <Label>Prénom</Label>
                                <Input
                                    type='text'
                                    name='text'
                                    value={user.firstname}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Nom</Label>
                                <Input
                                    type='text'
                                    name='text'
                                    value={user.lastname}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Email</Label>
                                <Input
                                    type='text'
                                    name='text'
                                    value={user.email}
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
