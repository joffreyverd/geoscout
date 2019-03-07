import React from 'react';
import { withRouter } from 'react-router-dom';

export default withRouter(({
    id,
    name,
    description,
    length,
    duration,
    needInternet,
    published,
    version,
    level,
    history
}) => (
        <li className='list-item' onClick={() => console.log(history)}>

            <h3 className='item-name'>{name}</h3>
            <span>{description}</span>
            <span>{length}</span>
            <span>{duration}</span>
            <span>{needInternet}</span>
            <span>{published}</span>
            <span>{version}</span>
            <span>{level}</span>

        </li>
    ));
