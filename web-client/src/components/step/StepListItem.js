import React from 'react';

export default ({ step, onClickItem }) => (
    <li className='step-wrapper-item' onClick={() => onClickItem(step)}>

        <div>
            <span className='step-name'>{step.name}</span>
        </div>

        <div>
            <span>{step.description}</span>
        </div>

        <span className='order-item'>{step.order}</span>

    </li>
);
