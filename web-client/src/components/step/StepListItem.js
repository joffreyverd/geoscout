import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

export default ({ step, onClickItem, stepFocus }) => (
    <Draggable
        draggableId={step.id_step}
        index={step.order}
    >
        {provided => (
            <li
                className={`step-wrapper-item ${stepFocus && step.id_step === stepFocus.id_step && 'focus-step'}`}
                onClick={() => onClickItem(step)}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >

                <div>
                    <span className='step-name'>{step.name}</span>
                </div>


                <span className='order-item'>{step.order}</span>

            </li>
        )}
    </Draggable>
);
