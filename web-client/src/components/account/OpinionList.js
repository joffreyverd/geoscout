import React from 'react';
import OpinionListItem from './OpinionListItem';

export default ({ items = [] }) => (

    <ul>
        {items.map(item => <OpinionListItem key={item.id} {...item} />)}
    </ul>

);
