import React from 'react';
import CreatedCircuitListItem from './CreatedCircuitListItem';

export default ({ items = [] }) => (

    <ul className='item-wrapper'>
        {items.map(item => <CreatedCircuitListItem key={item.idCircuit} {...item} />)}
    </ul>

);
