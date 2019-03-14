import React from 'react';

export default ({ step, onClickItem }) => (
    <li className='step-wrapper-item' draggable
        onClick={() => onClickItem(step)}
        onDragStart={(e) => handleDragStart(e, step)}
        onDragOver={(e) => { e.preventDefault(); }}
        onDrop={(e) => handleDrop(e, step.order)}>

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
    event.dataTransfer.setData('order', step.order)
}

/**
 * 
 * @param {Event} event 
 * @param {Integer} newOrder 
 */
function handleDrop(event, newOrder) {
    let id = event.dataTransfer.getData('id');
    let oldOrder = event.dataTransfer.getData('order');
    console.log('id : ' + id);
    console.log('old : ' + oldOrder);
    console.log('new : ' + newOrder);
}