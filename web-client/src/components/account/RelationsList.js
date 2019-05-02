import React from 'react';
import RelationsListItem from './RelationsListItem';

export default ({ items = [] }) => (

    <ul>
        {items.map(item => <RelationsListItem key={item.id_user} {...item} />)}
    </ul>

);
