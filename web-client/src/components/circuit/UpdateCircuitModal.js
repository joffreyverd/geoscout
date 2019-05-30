import React, { Component } from 'react';
import { withAlert } from 'react-alert';
import {
    Button, Form, FormGroup, Label, Input, ButtonDropdown,
    DropdownMenu, DropdownToggle, DropdownItem,
} from 'reactstrap';
import { Icon } from 'antd';
import 'antd/dist/antd.css';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import PreviewModal from './PreviewModal';

class UpdateCircuitModal extends Component {

    state = {
        difficultyDropdown: false,
        previewIsOpen: false,
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

    /**
     * Fonction de gestion de modification d'un circuit
     * @param {Event} event : event envoyé lorsque le nom d'un circuit est modifié
     */
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    /**
     * Fonction de gestion de modification d'un circuit
     * @param {String} value : renvoyée en cas de modification de la description
     */
    handleRichTextChange = (value) => {
        this.setState({
            description: value,
        });
    }

    handleSubmit = () => {
        const { name, description, level, version } = this.state;
        const { displayUpdateCircuit, alert, updateCircuit } = this.props;
        const { id_circuit } = this.props.circuit;
        const circuit = {
            id_circuit: id_circuit,
            name: name || null,
            description: description || null,
            level: level || null,
            version: version + 1,
        };
        updateCircuit(circuit)
            .then(() => {
                displayUpdateCircuit();
                alert.success('Circuit mis à jour');
            })
            .catch(() => console.log('Oups, une erreur s\'est produite'));
    }

    displayPreviewModal = () => {
        this.setState(previousState => ({
            previewIsOpen: !previousState.previewIsOpen,
        }));
    }

    displayDifficultyDropdown = () => {
        this.setState(previousState => ({
            difficultyDropdown: !previousState.difficultyDropdown,
        }));
    }

    onDifficultyFilterClick = (event) => {
        const { name } = event.target;
        let formattedLevel;
        switch (name) {
            case 'intermédiaire':
                formattedLevel = '1';
                break;
            case 'difficile':
                formattedLevel = '2';
                break;
            default:
                formattedLevel = '0';
        }
        this.setState({ level: formattedLevel });
    }

    render() {
        const { name, description, length, duration,
            level, previewIsOpen, difficultyDropdown,
        } = this.state;
        const { show, displayUpdateCircuit } = this.props;

        let formattedLevel;
        switch (level) {
            case '1':
                formattedLevel = 'Intermédiaire';
                break;
            case '2':
                formattedLevel = 'Difficile';
                break;
            default:
                formattedLevel = 'Facile';
        }

        return (
            <>
                <div className={show ? 'update-circuit' : 'hidden-update-circuit'}>
                    <div className='update-title'>
                        <h3>Modification du circuit</h3>
                        <Icon type='close' onClick={displayUpdateCircuit} className='close-icon' />
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
                            <ButtonDropdown
                                isOpen={difficultyDropdown}
                                toggle={this.displayDifficultyDropdown}
                            >
                                <DropdownToggle
                                    caret
                                    color='info'
                                >
                                    {formattedLevel}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem
                                        name='facile'
                                        value='1'
                                        onClick={this.onDifficultyFilterClick}
                                    >Facile
                                    </DropdownItem>
                                    <DropdownItem
                                        name='intermédiaire'
                                        value='2'
                                        onClick={this.onDifficultyFilterClick}
                                    >Intermédiaire
                                    </DropdownItem>
                                    <DropdownItem
                                        name='difficile'
                                        value='3'
                                        onClick={this.onDifficultyFilterClick}
                                    >Difficile
                                    </DropdownItem>
                                </DropdownMenu>
                            </ButtonDropdown>
                        </FormGroup>


                        {duration > 0 &&
                            <FormGroup>
                                <Label>Durée estimée</Label>
                                <p>{`${duration} heure(s)`}</p>
                            </FormGroup>
                        }


                        {length > 0 &&
                            <FormGroup>
                                <Label>Distance à vol d‘oiseau</Label>
                                <p>{`${length} km`}</p>
                            </FormGroup>
                        }

                        <div className='update-buttons'>
                            <Button
                                color='warning'
                                onClick={this.displayPreviewModal}
                            >Aperçu
                            </Button>
                            <Button
                                color='success'
                                onClick={this.handleSubmit}
                            >Valider
                            </Button>
                        </div>

                    </Form>
                </div>

                <PreviewModal
                    previewIsOpen={previewIsOpen}
                    displayPreviewModal={this.displayPreviewModal}
                    description={description}
                />

            </>
        );
    }

}

export default withAlert()(UpdateCircuitModal);
