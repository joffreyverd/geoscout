import React from 'react';
import { FormGroup, Label, Input, TabPane, Row, Col } from 'reactstrap';

export default class QuestionItem extends React.Component {

    state = {
    }

    render() {

        const { wording, response, handleChangeQuestion } = this.props;

        return (
            <>
                <TabPane tabId='1'>
                    <Row>
                        <Col sm='12'>
                            <FormGroup>
                                <Label>Intitulé de la question</Label>
                                <Input
                                    type='textarea'
                                    name='wording'
                                    // value={wording}
                                    onChange={handleChangeQuestion}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Réponse</Label>
                                <Input
                                    type='textarea'
                                    name='response'
                                    // value={response}
                                    onChange={handleChangeQuestion}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </TabPane>
            </>
        );
    }

}
