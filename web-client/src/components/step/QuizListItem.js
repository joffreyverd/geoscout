import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Button } from 'reactstrap';
import { Checkbox, Icon } from 'antd';
import 'antd/dist/antd.css';

class QuizListItem extends Component {

    state = {}

    render() {

        const { choice, response, handleChoicesChange,
            handleResponseChange, choiceIndex,
            deleteChoiceInput, questionIndex } = this.props;

        return (
            <>
                <div className='checkbox-input-wrapper'>
                    <Checkbox
                        className='choices-checkbox'
                        name={choice}
                        value={choice}
                        checked={(choice === response)}
                        onChange={event => handleResponseChange(event, choiceIndex, questionIndex)}
                    />
                    <Input
                        className='choice-input'
                        name={choice}
                        value={choice}
                        onChange={event => handleChoicesChange(event, choiceIndex, questionIndex)}
                    />
                    <Button
                        className='delete-choice-button'
                        type='primary'
                        color='danger'
                        name={choice}
                        value={choice}
                        onClick={() => deleteChoiceInput(choiceIndex, questionIndex, response)}
                    ><Icon type='delete' />
                    </Button>
                </div>
            </>
        );
    }

}

export default withRouter(QuizListItem);
