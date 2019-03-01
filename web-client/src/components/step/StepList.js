import React from 'react';
import StepListItem from './StepListItem';

export default ({items = []}) => (



    <ul className='step-wrapper'>
        {items.map(item => <StepListItem {...item}/>)}
    </ul>
    
);
