import React from 'react';
import CreatedCircuitListItems from './CreatedCircuitListItem';

export default ({ items = [] }) => (

    <ul className='item-wrapper'>
        {items.map(item => <CreatedCircuitListItems {...item}/>)}
    </ul>
    
);
