import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import QuizListItem from './QuizListItem';


class QuizList extends Component {

    state = {

    }

    render() {

        const { items = [], response, handleChoicesChange, handleResponseChange, activeTab } = this.props;

        return (
            <>
                <ul className='choices-list'>
                    {items.map((item, choiceIndex) => <QuizListItem
                        key={choiceIndex}
                        choiceIndex={choiceIndex}
                        questionIndex={activeTab}
                        choice={item}
                        response={response}
                        handleChoicesChange={handleChoicesChange}
                        handleResponseChange={handleResponseChange}
                        getNewChoices={this.getNewChoices}
                    />)}
                </ul>
            </>
        );

    }

}

export default withRouter(QuizList);
