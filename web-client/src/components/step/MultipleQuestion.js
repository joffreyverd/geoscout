import React from 'react';
import classnames from 'classnames';
import { Nav, NavItem, NavLink } from 'reactstrap';

import QuestionList from './QuestionList';

export default class MultipleQuestion extends React.Component {

    state = {
        activeTab: '0',
    }

    toggle = (tab) => {
        const { activeTab } = this.state;
        if (activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    }

    render() {

        const { activeTab } = this.state;
        const { questions, handleChangeQuestionType,
            handleChangeQuestion, handleChoicesChange,
            handleResponseChange, deleteChoiceInput, addNewChoice } = this.props;

        return (
            <>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '0' })}
                            onClick={() => { this.toggle('0'); }}
                        >
                            Facile
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}
                        >
                            Intermédiaire
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}
                        >
                            Difficile
                        </NavLink>
                    </NavItem>
                </Nav>

                <QuestionList
                    items={questions}
                    activeTab={activeTab}
                    addNewChoice={addNewChoice}
                    deleteChoiceInput={deleteChoiceInput}
                    handleChangeQuestionType={handleChangeQuestionType}
                    handleChangeQuestion={handleChangeQuestion}
                    handleChoicesChange={handleChoicesChange}
                    handleResponseChange={handleResponseChange}
                />

            </>
        );
    }

}
