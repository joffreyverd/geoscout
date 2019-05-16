import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';

import QuizList from './QuizList';

export default class QuizQuestion extends React.Component {

    state = {

    }

    render() {

        const { quiz, handleChoicesChange, deleteChoiceInput, handleQuizQuestion,
            handleResponseChange, addNewChoice, activeTab } = this.props;
        const qcm = (quiz.response) && quiz.response.split(':');
        const qcmResponse = (qcm) && qcm[1];
        const qcmChoices = (qcm) && qcm[0].split(',');

        return (
            <>

                <FormGroup>
                    <Label>Question</Label>
                    <Input
                        type='textarea'
                        name='wording'
                        value={quiz.wording}
                        onChange={event => handleQuizQuestion(event, activeTab)}
                    />
                </FormGroup>

                <Button
                    className='add-choice-button'
                    onClick={() => addNewChoice(activeTab)}
                    color='info'
                >Ajout choix
                </Button>

                {qcmChoices &&
                    <QuizList
                        items={qcmChoices}
                        response={qcmResponse}
                        deleteChoiceInput={deleteChoiceInput}
                        handleChoicesChange={handleChoicesChange}
                        handleResponseChange={handleResponseChange}
                        activeTab={activeTab}
                    />
                }

            </>

        );
    }

}
