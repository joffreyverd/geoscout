import React from 'react';

export default ({
    name, 
    idCircuit, 
    idUser, 
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
            <p>{description}</p>
            <p>{length}</p>
            <p>{duration}</p>
            <p>{needInternet}</p>
            <p>{published}</p>
            <p>{version}</p>
            <p>{level}</p>

    </li>
);
