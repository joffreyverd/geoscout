import React, { Component } from 'react';
import { withAlert } from 'react-alert';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Checkbox } from 'antd';
import 'antd/dist/antd.css';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import MultipleQuestion from './MultipleQuestion';

class UpdateStepModal extends Component {

    state = {
        name: '',
        description: '',
        instruction: '',
        validation: false,
        Questions: [],
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
        const { step } = this.props;
        if (prevProps.step !== step) {
            if (step) {
                this.setState(Object.assign({}, step, {
                    description: step.description || '',
                    instruction: step.instruction || '',
                    Questions: (step.Questions && step.Questions.length !== 0) ? step.Questions :
                        [{
                            wording: '',
                            response: '',
                        },
                        {
                            wording: '',
                            response: '',
                        },
                        {
                            wording: '',
                            response: '',
                        }],
                }));
            }
        }
    }

    /**
     * Fonction de gestion de modification des champs non-riches
     * @param {Event} event : évènement contenant la valeur des champs non-riches
     */
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    /**
     * Fonction de gestion de modification de la description d'une étape
     * @param {String} value : nouvelle valeur qui est renvoyée par le champs
     */
    handleRichTextChange = (value) => {
        this.setState({ description: value });
    }

    /**
     * Fonction de gestion de modification d'une question
     * @param {Event} event : event envoyé lorsqu'une question est modifiée
     * @param {String} index : index de la question qui vient d'être modifiée
     */
    handleChangeQuestion = (event, index) => {
        const { name, value } = event.target;
        this.setState((prevState) => {
            prevState.Questions[index][name] = value;
            return { Questions: prevState.Questions };
        });
    }

    /**
     * Fonction de gestion du changement d'état de la checkbox
     * @param {Event} event : event envoyé lorsque la checkbox est cochée
     */
    handleCheckboxChange = (event) => {
        this.setState({ validation: event.target.checked });
    }

    handleSubmit = () => {
        const step = this.state;
        const { displayUpdateStep, updateStep, alert } = this.props;
        updateStep(step)
            .then(() => {
                this.putQuestion(step.Questions);
                displayUpdateStep();
                alert.success('Etape mise à jour');
            })
            .catch(() => alert.error('Oups, une erreur s\'est produite'));
    }

    render() {
        const { id_step, name, description, instruction, validation, Questions } = this.state;
        const { show, displayUpdateStep, removeStep } = this.props;

        return (
            <>
                <div className={show ? 'update-step' : 'hidden-update-step'}>
                    <div className='update-title'>
                        <h3>{'Modification de l\'étape'}</h3>
                    </div>
                    <Form className='update-form' onSubmit={e => e.preventDefault()}>
                        <FormGroup>
                            <Label id='scroll-top-step'>Nom</Label>
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
                            <Label>Instruction de transit</Label>
                            <Input
                                type='textarea'
                                name='instruction'
                                value={instruction}
                                onChange={this.handleChange}
                            />
                        </FormGroup>

                        <Checkbox
                            name='validation'
                            value={validation}
                            onChange={this.handleCheckboxChange}
                        >Validation par position GPS
                        </Checkbox>

                        <MultipleQuestion
                            questions={Questions}
                            handleChangeQuestion={this.handleChangeQuestion}
                        />

                        <div className='update-buttons'>
                            <Button
                                type='submit'
                                color='info'
                                onClick={this.handleSubmit}
                            >Modifier
                            </Button>
                            <Button
                                color='danger'
                                onClick={() => removeStep(id_step)}
                            >Supprimer
                            </Button>
                            <Button
                                color='secondary'
                                onClick={displayUpdateStep}
                            >Annuler
                            </Button>
                        </div>

                    </Form>
                </div>
            </>
        );
    }

}

export default withAlert()(UpdateStepModal);
