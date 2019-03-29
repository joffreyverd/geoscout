import React from 'react';
import { TabContent } from 'reactstrap';
import QuestionListItem from './QuestionListItem';

export default ({ items = [], handleChangeQuestion }) => (

    <TabContent activeTab='1'>
        {
            items.map(item => <QuestionListItem
                {...item}
                handleChangeQuestion={handleChangeQuestion}
            />)
        }
    </TabContent>

);
