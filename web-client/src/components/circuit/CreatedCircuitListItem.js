import React from 'react';

export default ({
    name,
    description,
    length,
    duration,
    needInternet,
    published,
    version,
    level
}) => (
        <li className='list-item'>

            <h3 className='item-name'>{name}</h3>
            <span>{description}</span>
            <span>{length}</span>
            <span>{duration}</span>
            <span>{needInternet}</span>
            <span>{published}</span>
            <span>{version}</span>
            <span>{level}</span>

        </li>
    );
