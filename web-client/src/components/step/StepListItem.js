import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

export default ({ step, onClickItem }) => (
    <Draggable
        draggableId={step.id_step}
        index={step.order}
    >
        {(provided, snapshot) => (
            <li
                className='step-wrapper-item'
                onClick={() => onClickItem(step)}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >

                <div>
                    <span className='step-name'>{step.name}</span>
                </div>

                <div>
                    <span>{step.description}</span>
                </div>

                <span className='order-item'>{step.order}</span>

            </li>
        )}
    </Draggable>
);
