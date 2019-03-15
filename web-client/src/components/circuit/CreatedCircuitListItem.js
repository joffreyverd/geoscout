import React from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Tooltip } from 'reactstrap';

export default withRouter(({
    id_circuit,
    name,
    description,
    length,
    duration,
    published,
    version,
    level,
    history,
}) => {

    let classLevel;
    switch (level) {
        case '1':
            classLevel = 'medium';
            break;
        case '2':
            classLevel = 'hard';
            break;
        default:
            classLevel = 'easy';
            break;
    }

    return (
        <>
            <li className='list-item' onClick={() => history.push(`circuit/${id_circuit}`)}>

                <h3 className='item-name'>{name}</h3>
                <p>{description && description}</p>
                <p>{length && `${length} km`}</p>
                <p>{duration && `${length} heures`}</p>
                <p className='version-item'>{version && `Version : ${version}`}</p>
                <FontAwesomeIcon
                    icon='align-justify'
                    className='published-item'
                    color={published === 1 ? '#27ae60' : 'white'}
                />
                <span className={`level-item ${classLevel}`} />

            </li>
        </>
    );
});
