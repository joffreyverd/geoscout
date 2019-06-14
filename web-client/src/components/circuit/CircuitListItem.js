import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Tooltip } from 'reactstrap';
import { Rate, Avatar } from 'antd';
import 'antd/dist/antd.css';

import api from '../../utils/httpMethods';

class CircuitListItem extends Component {

    state = {
        tooltipPublicationOpen: false,
        tooltipLevelOpen: false,
    };

    componentDidMount = () => {
        const { id_circuit } = this.props;
        api.post('download', {
            id: id_circuit,
            type: 'circuit',
        }).then((img) => {
            this.setState({ img });
        }).catch(() => {
            console.log('error');
        });
    }

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
            id_circuit, name, description, avgStars, length, isAdmin,
            duration, version, published, level, history,
        } = this.props;
        const { tooltipLevelOpen, img } = this.state;

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
        const formattedStar = Math.round(avgStars * 2) / 2;

        return (
            <>
                <li
                    className={published === true ? 'list-item' : 'list-item unpublished'}
                    onClick={() => history.push(`detail/${id_circuit}`)}
                >

                    <h3 className='item-name'>{nameOverview}</h3>

                    {overview && overview !== '' &&
                        <p className='smart-description-circuit'>{overview}</p>
                    }

                    <div className='km-and-time'>
                        {length > 0 && length !== null &&
                            <p className='bold-info-circuit'>{length} km</p>
                        }

                        {duration > 0 && duration !== null &&
                            <p className='bold-info-circuit'>{duration && `${timeHour}h${timeMinute}m`}</p>
                        }
                    </div>

                    <Rate disabled allowHalf defaultValue={0} value={formattedStar} />

                    <img
                        className='picture-circuit-minature'
                        src={img === undefined || img.length === 0 ? 'https://i.ytimg.com/vi/yWYBIYD4JNo/maxresdefault.jpg' : `http://www.geoscout.fr:5555${img[0]}`}
                        alt={name}
                    />


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
