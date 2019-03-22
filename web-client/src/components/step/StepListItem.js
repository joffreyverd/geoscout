import React from 'react';

export default ({ step, onClickItem, handleDrop, stepFocus }) => (
    <li
        className={`step-wrapper-item ${stepFocus && step.id_step === stepFocus.id_step && 'focus-step'}`}
        draggable
        onClick={() => onClickItem(step)}
        onDragStart={e => handleDragStart(e, step)}
        onDragOver={e => handleDragOver(e)}
        onDrop={e => handleDrop(e, step.order)}
    >

        <div>
            <span className='step-name'>{step.name}</span>
        </div>

        <div>
            <span>{step.description}</span>
        </div>

        <span className='order-item'>{step.order}</span>

    </li>
);

/**
 *
 * @param {Event} event
 * @param {Step} step
 */
function handleDragStart(event, step) {
    event.dataTransfer.setData('id', step.id_step);
    event.dataTransfer.setData('order', step.order);
}

function handleDragOver(event) {
    event.preventDefault();
}
