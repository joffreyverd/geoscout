import React from 'react';
import { FormGroup, Label, Input, TabPane, Row, Col } from 'reactstrap';
import { Menu, Dropdown, Button } from 'antd';
import 'antd/dist/antd.css';

export default class QuestionItem extends React.Component {

    state = {
    }

    render() {

        const { handleChangeQuestion } = this.props;
        const { wording, response } = (this.props.items) ? this.props.items : '';
        const menu = (
            <Menu>
                <Menu.Item>5 points</Menu.Item>
                <Menu.Item>10 points</Menu.Item>
                <Menu.Item>15 points</Menu.Item>
            </Menu>
        );

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
                                    value={wording}
                                    onChange={handleChangeQuestion}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Réponse</Label>
                                <Input
                                    type='textarea'
                                    name='response'
                                    value={response}
                                    onChange={handleChangeQuestion}
                                />
                            </FormGroup>

                            <Dropdown overlay={menu} placement='topCenter' className='dropdown-question-score'>
                                <Button>Points</Button>
                            </Dropdown>

                        </Col>
                    </Row>
                </TabPane>
            </>
        );
    }

}
