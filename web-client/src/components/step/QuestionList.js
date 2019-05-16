import React from 'react';
import { FormGroup, Label, Input, TabPane, Row, Col, TabContent } from 'reactstrap';
import { Checkbox } from 'antd';
import 'antd/dist/antd.css';

import Quiz from './Quiz';

export default class QuestionList extends React.Component {

    state = {
    }

    render() {


        const { activeTab, handleChangeQuestionType,
            handleChangeQuestion, handleChoicesChange,
            handleResponseChange, items } = this.props;
        const { wording, response } = (this.props.items[activeTab]) ? this.props.items[activeTab] : '';
        const quizQuestion = (this.props.items[activeTab]
            && this.props.items[activeTab].type_of === 1);

        return (

            <>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId={activeTab}>
                        <Row>
                            <Col sm='12'>

                                <Checkbox
                                    className='is-quizz-checkbox'
                                    name='quizQuestion'
                                    checked={quizQuestion}
                                    value={quizQuestion}
                                    onChange={event => handleChangeQuestionType(event, activeTab)}
                                >{(quizQuestion) ? 'Quiz' : 'Question libre'}
                                </Checkbox>

                                {quizQuestion ?
                                    <>
                                        <Quiz
                                            quiz={items[activeTab]}
                                            activeTab={activeTab}
                                            wording={wording}
                                            response={response}
                                            handleChangeQuestionType={handleChangeQuestionType}
                                            handleChoicesChange={handleChoicesChange}
                                            handleResponseChange={handleResponseChange}
                                        />
                                    </>
                                    :
                                    <>
                                        <FormGroup>
                                            <Label>Question</Label>
                                            <Input
                                                type='textarea'
                                                name='wording'
                                                value={(wording) || ''}
                                                onChange={event => handleChangeQuestion(event, activeTab)}
                                            />
                                        </FormGroup>

                                        <FormGroup>
                                            <Label>Réponse</Label>
                                            <Input
                                                type='textarea'
                                                name='response'
                                                value={(response) || ''}
                                                onChange={event => handleChangeQuestion(event, activeTab)}
                                            />
                                        </FormGroup>
                                    </>
                                }

                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </>
        );

    }

}
