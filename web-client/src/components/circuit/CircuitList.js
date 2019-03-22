import React from 'react';
import CircuitListItem from './CircuitListItem';

export default ({ items = [] }) => (

    <ul className='item-wrapper'>
        {items.map(item => <CircuitListItem key={item.id_circuit} {...item} />)}
    </ul>

);
