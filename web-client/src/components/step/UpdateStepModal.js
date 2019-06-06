import React, { Component } from 'react';
import { withAlert } from 'react-alert';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Checkbox, Icon } from 'antd';
import 'antd/dist/antd.css';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import MultipleQuestion from './MultipleQuestion';

class UpdateStepModal extends Component {

    state = {
        name: '',
        description: '',
        instruction: '',
        compass: false,
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
                    validation: step.validation || false,
                    Questions: (step.Questions && step.Questions.length !== 0) ? step.Questions :
                        [{
                            wording: '',
                            response: '',
                            type_of: 1,
                            points: 5,
                            difficulty: 1,
                        },
                        {
                            wording: '',
                            response: '',
                            type_of: 1,
                            points: 10,
                            difficulty: 2,
                        },
                        {
                            wording: '',
                            response: '',
                            type_of: 1,
                            points: 15,
                            difficulty: 3,
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

    handleResponseChange = (event, choiceIndex, questionIndex) => {
        const { value } = event.target;
        const { Questions } = this.state;
        const qcm = (Questions[questionIndex].response) && Questions[questionIndex].response.split(':');
        const oldChoices = (qcm) && qcm[0].split(',');
        oldChoices[choiceIndex] = value;
        oldChoices.toString();
        this.setState((prevState) => {
            prevState.Questions[questionIndex].response = `${oldChoices}:${value}`;
            return { Questions: prevState.Questions };
        });
    }

    handleChoicesChange = (event, choiceIndex, questionIndex) => {
        const { value } = event.target;
        const { Questions } = this.state;
        const qcm = (Questions[questionIndex].response) && Questions[questionIndex].response.split(':');
        const oldChoices = (qcm) && qcm[0].split(',');
        oldChoices[choiceIndex] = value;
        oldChoices.toString();
        this.setState((prevState) => {
            prevState.Questions[questionIndex].response = `${oldChoices}:${value}`;
            return { Questions: prevState.Questions };
        });
    }

    handleChangeQuestionType = (event, activeTab) => {
        const newKindOf = (event.target.value === true) ? 2 : 1;
        this.setState((prevState) => {
            prevState.Questions[activeTab].type_of = newKindOf;
            return { Questions: prevState.Questions };
        });
    }

    addNewChoice = (activeTab) => {
        const { Questions } = this.state;
        const splitedField = Questions[activeTab].response.split(':');
        const newField = (Questions[activeTab].response) ? `${splitedField[0]},` : ',';
        this.setState((prevState) => {
            prevState.Questions[activeTab].response = newField;
            return { Questions: prevState.Questions };
        });
    }

    deleteChoiceInput = (choiceIndex, questionIndex, response) => {
        const { Questions } = this.state;
        const splitedField = Questions[questionIndex].response.split(':');
        const oldChoices = splitedField[0].split(',');
        const valueToDelete = oldChoices.splice(choiceIndex, 1);
        delete oldChoices[valueToDelete];
        oldChoices.toString();
        this.setState((prevState) => {
            prevState.Questions[questionIndex].response = `${oldChoices}:${response}`;
            return { Questions: prevState.Questions };
        });
    }

    handleQuizQuestion = (event, activeTab) => {
        const { value } = event.target;
        this.setState((prevState) => {
            prevState.Questions[activeTab].wording = value;
            return { Questions: prevState.Questions };
        });
    }

    /**
     * Fonction de gestion du changement d'état de la checkbox
     * @param {Event} event : event envoyé lorsque la checkbox est cochée
     */
    handleCheckboxChange = (event) => {
        const { checked } = event.target;
        const { compass } = this.state;
        if (!compass) {
            this.setState((prevState) => {
                prevState.validation = checked;
                return { validation: prevState.validation };
            });
        }
    }

    handleCheckboxCompassChange = (event) => {
        const { validation } = this.state;
        if (!validation) {
            this.handleCheckboxChange(event);
        }
        const { checked } = event.target;
        this.setState((prevState) => {
            prevState.compass = checked;
            return { compass: prevState.compass };
        });
    }

    handleSubmit = () => {
        const step = this.state;
        const { displayUpdateStep, updateStep, alert } = this.props;
        updateStep(step)
            .then(() => {
                displayUpdateStep();
                alert.success('Etape mise à jour');
            })
            .catch(() => alert.error('Oups, une erreur s\'est produite'));
    }

    render() {
        const { id_step, name, description, instruction, validation, compass, Questions } = this.state;
        const { show, displayUpdateStep, removeStep } = this.props;
        console.log(compass);

        return (
            <>
                <div className={show ? 'update-step' : 'hidden-update-step'}>
                    <div className='update-title'>
                        <h3>{'Modification de l\'étape'}</h3>
                        <Icon type='close' onClick={displayUpdateStep} className='close-icon' />
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
                            checked={validation}
                            onChange={this.handleCheckboxChange}
                        >Validation du transit par détection GPS
                        </Checkbox>

                        <Checkbox
                            name='validation'
                            value={compass}
                            checked={compass}
                            onChange={this.handleCheckboxCompassChange}
                        >Parcours du transit en mode boussole
                        </Checkbox>

                        <MultipleQuestion
                            questions={Questions}
                            handleQuizQuestion={this.handleQuizQuestion}
                            addNewChoice={this.addNewChoice}
                            deleteChoiceInput={this.deleteChoiceInput}
                            handleChangeQuestionType={this.handleChangeQuestionType}
                            handleChangeQuestion={this.handleChangeQuestion}
                            handleChoicesChange={this.handleChoicesChange}
                            handleResponseChange={this.handleResponseChange}
                        />

                        <div className='update-buttons'>
                            <Button
                                type='submit'
                                color='success'
                                onClick={this.handleSubmit}
                            >Valider
                            </Button>
                            <Button
                                color='danger'
                                onClick={() => removeStep(id_step)}
                            >Supprimer
                            </Button>
                        </div>

                    </Form>
                </div>
            </>
        );
    }

}

export default withAlert()(UpdateStepModal);
