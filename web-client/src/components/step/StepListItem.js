import React from 'react';

export default ({ name, description, order }) => (
    <li className='step-wrapper-item'>

        <div>
            <span className='step-name'>{name}</span>
        </div>

        <div>
            <span>{description}</span>
        </div>

        <span className='order-item'>{order}</span>

    </li>
);
