import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Input } from 'reactstrap';
import { Checkbox } from 'antd';
import 'antd/dist/antd.css';

class QuizListItem extends Component {

    state = {}

    render() {

        const { choice, response, handleChoicesChange, handleResponseChange, choiceIndex, questionIndex } = this.props;

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
                </div>
            </>
        );
    }

}

export default withRouter(QuizListItem);
