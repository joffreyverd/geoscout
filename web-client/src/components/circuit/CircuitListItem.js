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
            id_circuit, name, description, length, onHome,
            duration, version, published, level, history,
        } = this.props;
        const { tooltipPublicationOpen, tooltipLevelOpen } = this.state;

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
                <li
                    className='list-item'
                    onClick={() => (onHome ? history.push(`detail/${id_circuit}`) : history.push(`circuit/${id_circuit}`))}
                >

                    <h3 className='item-name'>{name}</h3>
                    <p>{description && description}</p>
                    <p>{length && `${length} km`}</p>
                    <p>{duration && `${length} heures`}</p>
                    <p className='version-item'>{version && `Version : ${version}`}</p>

                    {!onHome &&
                        <>
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
