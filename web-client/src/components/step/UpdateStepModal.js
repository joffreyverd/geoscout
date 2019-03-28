import React, { Component } from 'react';
import { withAlert } from 'react-alert';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import api from '../../utils/httpMethods';

class UpdateStepModal extends Component {

    state = {
        name: '',
        description: '',
        instruction: '',
        questions: { wording: '', response: '' },
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
                    questions: step.questions || {
                        wording: '',
                        response: '',
                    },
                }));
                this.fetchQuestion(step.id_step);
            }
        }
    }

    fetchQuestion = (id_step) => {
        api.get(`step/${id_step}/questions`).then((data) => {
            if (data.length > 0) {
                this.setState({
                    questions: {
                        id: data[0].id_question || undefined,
                        wording: data[0].wording || '',
                        response: data[0].response || '',
                    },
                });
            }
        });
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleRichTextChange = (value) => {
        this.setState({
            description: value,
        });
    }

    handleChangeQuestion = (event) => {
        event.persist();
        this.setState((prev) => {
            prev.questions[event.target.name] = event.target.value;
            return { questions: prev.questions };
        });
    }

    handleSubmit = () => {
        const step = this.state;
        const { displayUpdateStep, alert } = this.props;
        this.props.updateStep(step)
            .then(() => {
                this.putQuestion(step.questions);
                displayUpdateStep();
                alert.success('Etape mise à jour');
            })
            .catch(() => alert.error('Oups, une erreur s\'est produite'));
    }

    putQuestion(question) {
        if (question.id) {
            return api.put(`question/${question.id}`, question);
        }
        return api.post('question', Object.assign({ id_step: this.state.id_step }, question));

    }

    render() {
        const { id_circuit, id_step, name, description, instruction, questions: { wording, response } } = this.state;
        const { show, displayUpdateStep, removeStep } = this.props;

        return (
            <>
                <div className={show ? 'update-step' : 'hidden-update-step'}>
                    <div className='update-title'>
                        <h3>{'Modification de l\'étape'}</h3>
                    </div>
                    <Form className='update-form' onSubmit={e => e.preventDefault()}>
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
                            <Label>Instruction de direction</Label>
                            <Input
                                type='textarea'
                                name='instruction'
                                value={instruction}
                                onChange={this.handleChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Intitulé de la question</Label>
                            <Input
                                type='textarea'
                                name='wording'
                                value={wording}
                                onChange={this.handleChangeQuestion}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Réponse</Label>
                            <Input
                                type='textarea'
                                name='response'
                                value={response}
                                onChange={this.handleChangeQuestion}
                            />
                        </FormGroup>

                        <div className='update-buttons'>
                            <Button
                                type='submit'
                                color='info'
                                onClick={this.handleSubmit}
                            >Modifier
                            </Button>
                            <Button
                                color='danger'
                                onClick={() => removeStep(id_circuit, id_step)}
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
