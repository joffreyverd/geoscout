import React from 'react';
import { FormGroup, Label, Input, TabPane, Row, Col, TabContent } from 'reactstrap';
import 'antd/dist/antd.css';

export default class QuestionList extends React.Component {

    state = {
    }

    render() {
        const { activeTab, handleChangeQuestion } = this.props;
        const { wording, response } = (this.props.items[activeTab]) ? this.props.items[activeTab] : '';

        return (

            <>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId={activeTab}>
                        <Row>
                            <Col sm='12'>

                                <FormGroup>
                                    <Label>Intitulé de la question</Label>
                                    <Input
                                        type='textarea'
                                        name='wording'
                                        value={(wording !== undefined) ? wording : ''}
                                        onChange={handleChangeQuestion}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label>Réponse</Label>
                                    <Input
                                        type='textarea'
                                        name='response'
                                        value={(response !== undefined) ? response : ''}
                                        onChange={handleChangeQuestion}
                                    />
                                </FormGroup>

                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </>
        );

    }

}
