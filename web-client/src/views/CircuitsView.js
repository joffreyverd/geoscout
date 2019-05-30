import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import '../css/app-minifized.css';
import { copyFile } from 'fs';
import CreatedCircuitList from '../components/circuit/CircuitList';

import api from '../utils/httpMethods';

export default class CircuitsView extends Component {

    state = {
        dropdownOpen: false,
        filter: 'Tous',
        circuits: [],
    };

    toggle = () => {
        const { dropdownOpen } = this.state;
        this.setState({
            dropdownOpen: !dropdownOpen,
        });
    }

    onFilterClick = (event) => {
        this.setState({ filter: event.target.name });
    }

    componentDidMount = () => {
        const { isAdmin, circuits } = this.props;

        if (isAdmin === 'home') {
            this.setState({
                circuits: circuits,
            });

        } else if (isAdmin === 'achieved') {
            api.get('achievedcircuit').then((data) => {
                const formattedCircuits = data.map(item => item.Circuit);
                const achievementStatus = data.map(item => item.statut_circuit);

                for (let i = 0; i < achievementStatus.length; i++) {
                    formattedCircuits[i].statut_circuit = achievementStatus[i];
                }

                this.setState({
                    circuits: formattedCircuits,
                });
            }).catch(() => {
                console.log('error');
            });

        } else if (isAdmin === 'favorites') {
            api.get('favorites').then((data) => {
                this.setState({ circuits: data });
            }).catch(() => {
                console.log('error');
            });
        } else {
            api.get('my-circuits').then((data) => {
                this.setState({ circuits: data });
            }).catch(() => {
                console.log('error');
            });
        }
    }

    render() {
        const { dropdownOpen, filter, circuits } = this.state;
        const { isAdmin } = this.props;
        const showPublished = (filter === 'Publiés');

        let showAchievedStatus;
        switch (filter) {
            case 'En cours':
                showAchievedStatus = 0;
                break;
            case 'En pause':
                showAchievedStatus = 1;
                break;
            case 'Achevés':
                showAchievedStatus = 2;
                break;
            case 'Abandonnés':
                showAchievedStatus = 3;
                break;
            default:
                showAchievedStatus = 'Tous';
                break;
        }

        return (
            <>
                <div className='my-circuits-header'>
                    {isAdmin === 'home' && <h1>Circuits environnants</h1>}
                    {isAdmin === 'created' && <h1>Circuits créés</h1>}
                    {isAdmin === 'achieved' && <h1>Circuits accomplis</h1>}
                    {isAdmin === 'favorites' && <h1>Circuits favoris</h1>}

                    {isAdmin === 'achieved' &&
                        <div className='header-buttons'>
                            <ButtonDropdown
                                direction='left'
                                className='button-dropdown'
                                isOpen={dropdownOpen}
                                toggle={this.toggle}
                            >
                                <DropdownToggle
                                    caret
                                    color='info'
                                >{filter}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem
                                        name='Tous'
                                        onClick={this.onFilterClick}
                                    >Tous
                                    </DropdownItem>
                                    <DropdownItem
                                        name='En cours'
                                        onClick={this.onFilterClick}
                                    >En cours
                                    </DropdownItem>
                                    <DropdownItem
                                        name='En pause'
                                        onClick={this.onFilterClick}
                                    >En pause
                                    </DropdownItem>
                                    <DropdownItem
                                        name='Abandonnés'
                                        onClick={this.onFilterClick}
                                    >Abandonnés
                                    </DropdownItem>
                                    <DropdownItem
                                        name='Achevés'
                                        onClick={this.onFilterClick}
                                    >Achevés
                                    </DropdownItem>
                                </DropdownMenu>
                            </ButtonDropdown>
                        </div>
                    }

                    {isAdmin === 'created' &&
                        <div className='header-buttons'>

                            <ButtonDropdown
                                direction='left'
                                className='button-dropdown'
                                isOpen={dropdownOpen}
                                toggle={this.toggle}
                            >
                                <DropdownToggle
                                    caret
                                    color='info'
                                >{filter}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem
                                        name='Tous'
                                        onClick={this.onFilterClick}
                                    >Tous
                                    </DropdownItem>
                                    <DropdownItem
                                        name='Publiés'
                                        onClick={this.onFilterClick}
                                    >Publiés
                                    </DropdownItem>
                                    <DropdownItem
                                        name='Non-publiés'
                                        onClick={this.onFilterClick}
                                    >Non-publiés
                                    </DropdownItem>
                                </DropdownMenu>
                            </ButtonDropdown>
                        </div>
                    }

                </div>

                {filter === 'Tous' ?
                    <CreatedCircuitList
                        items={circuits}
                        isAdmin={isAdmin}
                    />
                    :
                    <CreatedCircuitList
                        items={(isAdmin === 'achieved') ?
                            circuits.filter(element => element.statut_circuit === showAchievedStatus) :
                            circuits.filter(element => element.published === (showPublished))}
                        isAdmin={isAdmin}
                    />
                }

            </>
        );
    }

}
