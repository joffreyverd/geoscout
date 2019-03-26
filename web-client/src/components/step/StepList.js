import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import StepListItem from './StepListItem';

export default ({ items = [], onClickItem, stepFocus }) => (
    <Droppable droppableId='drop-step' type='STEP'>
        {(provided, snapshot) => (
            <ul
                className='step-wrapper'
                ref={provided.innerRef}
                style={{ backgroundColor: snapshot.isDraggingOver && '#65D8C1' }}
                {...provided.droppableProps}
            >
                {items.map(item => <StepListItem
                    key={item.order}
                    step={item}
                    onClickItem={onClickItem}
                    stepFocus={stepFocus}
                />)}
                {provided.placeholder}
            </ul>
        )}
    </Droppable>

);
