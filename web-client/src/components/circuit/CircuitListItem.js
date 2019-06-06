import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from 'reactstrap';

class CircuitListItem extends Component {

    state = {
        tooltipPublicationOpen: false,
        tooltipLevelOpen: false,
    };

    publishedStatusToggler = () => {
        this.setState({
            tooltipPublicationOpen: !this.state.tooltipPublicationOpen,
        });
    }

    levelToggler = () => {
        this.setState({
            tooltipLevelOpen: !this.state.tooltipLevelOpen,
        });
    }

    render() {

        const {
            id_circuit, name, description, length, isAdmin,
            duration, version, published, level, history,
        } = this.props;
        const { tooltipPublicationOpen, tooltipLevelOpen } = this.state;

        const timeHour = Math.floor(duration / 60);
        const timeMinute = duration % 60;

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

        const nameOverview = (name != null) && name.length <= 20 ? name.substring(0, 20) : `${name.substring(0, 20)}...`;
        const overview = (description != null) && `${description.replace(/<(.|\n)*?>/g, '').substring(0, 50)}...`;

        return (
            <>
                <li
                    className='list-item'
                    onClick={() => history.push(`detail/${id_circuit}`)}
                >

                    <h3 className='item-name'>{nameOverview}</h3>

                    {overview}

                    {(length && length > 0 && length !== null) &&
                        <p className='bold-info-circuit'>{length} km</p>
                    }

                    {(duration && duration > 0 && duration !== null) &&
                        <p className='bold-info-circuit'>{duration && `${timeHour}h${timeMinute}m`}</p>
                    }

                    {isAdmin === 'created' &&

                        <>
                            <p className='version-item'>{version >= 0 && `Version : ${version}`}</p>
                            <p
                                className='edit-circuit-button'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    history.push(`circuit/${id_circuit}`);
                                }}
                            >Editer
                            </p>

                            <Tooltip
                                placement='top'
                                isOpen={tooltipPublicationOpen}
                                autohide={false}
                                target={`published${id_circuit}`}
                                toggle={this.publishedStatusToggler}
                            >
                                {published === true ? 'Publié' : 'Non-publié'}
                            </Tooltip>
                            <FontAwesomeIcon
                                id={`published${id_circuit}`}
                                icon='align-justify'
                                className='published-item'
                                color={published === true ? '#27ae60' : 'white'}
                            />
                        </>
                    }
                    <Tooltip
                        placement='top'
                        isOpen={tooltipLevelOpen}
                        autohide={false}
                        target={`level${id_circuit}`}
                        toggle={this.levelToggler}
                    >
                        {`Difficulté : ${classLevel}`}
                    </Tooltip>
                    <span className={`level-item ${classLevel}`} id={`level${id_circuit}`} />

                </li>
            </>
        );
    }

}

export default withRouter(CircuitListItem);
