import React from 'react';
import { withRouter } from 'react-router-dom';

export default withRouter(({
    id_circuit,
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
        <li className='list-item' onClick={() => history.push(`circuit/${id_circuit}`)}>

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
