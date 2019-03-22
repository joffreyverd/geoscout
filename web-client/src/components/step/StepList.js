import React from 'react';
import StepListItem from './StepListItem';

export default ({ items = [], onClickItem, handleDrop, stepFocus }) => (

    <ul className='step-wrapper'>
        {items.map(item => <StepListItem
            key={item.order}
            step={item}
            onClickItem={onClickItem}
            handleDrop={handleDrop}
            stepFocus={stepFocus}
        />)}
    </ul>

);
