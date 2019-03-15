import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class UpdateCircuitModal extends Component {

    state = {
        name: '',
        description: '',
        length: '',
        duration: '',
    };

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

    handleSubmit = () => {
        const { id_circuit, name, description, length, duration } = this.state;
        const circuit = {
            id_circuit: id_circuit,
            name: name || null,
            description: description || null,
            length: length || null,
            duration: duration || null,
        };
        const { displayUpdateCircuit } = this.props;
        this.props.updateCircuit(circuit)
            .then(() => displayUpdateCircuit())
            .catch(error => console.log(error));
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
                            <Input
                                type='textarea'
                                name='description'
                                value={description}
                                onChange={this.handleChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Distance moyenne</Label>
                            <Input
                                type='text'
                                name='length'
                                value={length}
                                onChange={this.handleChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Durée moyenne</Label>
                            <Input
                                type='text'
                                name='duration'
                                value={duration}
                                onChange={this.handleChange}
                            />
                        </FormGroup>

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

export default UpdateCircuitModal;
