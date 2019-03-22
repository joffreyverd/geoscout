import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import StepListItem from './StepListItem';

export default ({ items = [], onClickItem }) => (
    <Droppable droppableId='drop-step' type='STEP'>
        {(provided, snapshot) => (
            <ul
                className='step-wrapper'
                ref={provided.innerRef}
                {...provided.droppableProps}
            >
                {items.map(item => <StepListItem
                    key={item.order}
                    step={item}
                    onClickItem={onClickItem}
                />)}
                {provided.placeholder}
            </ul>
        )}
    </Droppable>

);
