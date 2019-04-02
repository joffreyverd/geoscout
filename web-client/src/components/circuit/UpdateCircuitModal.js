import React, { Component } from 'react';
import { withAlert } from 'react-alert';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class UpdateCircuitModal extends Component {

    state = {
        name: '',
        description: '',
        length: '',
        duration: '',
    };

    modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link', 'image'],
            ['clean'],
        ],
    };

    formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image',
    ];

    componentDidUpdate(prevProps) {
        const { circuit } = this.props;
        if (prevProps.circuit !== circuit) {
            if (circuit) {
                this.setState(Object.assign({}, circuit, {
                    description: circuit.description || '',
                    instruction: circuit.instruction || '',
                    length: circuit.length || '',
                    duration: circuit.duration || '',
                }));
            }
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleRichTextChange = (value) => {
        this.setState({
            description: value,
        });
    }

    handleSubmit = () => {
        const { id_circuit, name, description, length, duration } = this.state;
        const { displayUpdateCircuit, alert, updateCircuit } = this.props;
        const circuit = {
            id_circuit: id_circuit,
            name: name || null,
            description: description || null,
            length: length || null,
            duration: duration || null,
        };

        updateCircuit(circuit)
            .then(() => {
                displayUpdateCircuit();
                alert.success('Circuit mis à jour');
            })
            .catch(() => console.log('Oups, une erreur s\'est produite'));
    }

    render() {
        const { name, description, length, duration } = this.state;
        const { show, displayUpdateCircuit } = this.props;

        return (
            <>
                <div className={show ? 'update-circuit' : 'hidden-update-circuit'}>
                    <div className='update-title'>
                        <h3>Modification du circuit</h3>
                    </div>
                    <Form className='update-form'>
                        <FormGroup>
                            <Label>Nom</Label>
                            <Input
                                type='text'
                                name='name'
                                value={name}
                                onChange={this.handleChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Description</Label>
                            <ReactQuill
                                className='rich-text-editor'
                                theme='snow'
                                modules={this.modules}
                                formats={this.formats}
                                value={description}
                                onChange={this.handleRichTextChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Durée estimée</Label>
                            <p>{`${duration} heure(s)`}</p>
                        </FormGroup>

                        {length > 0 &&
                            <FormGroup>
                                <Label>Distance à vol d'oisée</Label>
                                <p>{`${length} km`}</p>
                            </FormGroup>
                        }

                        <div className='update-buttons'>
                            <Button
                                color='info'
                                onClick={this.handleSubmit}
                            >Modifier
                            </Button>
                            <Button
                                color='secondary'
                                onClick={displayUpdateCircuit}
                            >Annuler
                            </Button>
                        </div>

                    </Form>
                </div>
            </>
        );
    }

}

export default withAlert()(UpdateCircuitModal);
