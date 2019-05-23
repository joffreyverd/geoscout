import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import '../css/app-minifized.css';
import CreatedCircuitList from '../components/circuit/CircuitList';

import api from '../utils/httpMethods';

export default class CircuitsView extends Component {

    state = {
        dropdownOpen: false,
        filter: 'Tous',
        achievedFilter: 'Tous',
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

    onAchievedFilterClick = (event) => {
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
                this.setState({ circuits: formattedCircuits });
            }).catch(() => {
                console.log(this.props);
            });

        } else if (isAdmin === 'favorites') {
            api.get('favorites').then((data) => {
                const formattedCircuits = data.map(item => item.Circuit);
                this.setState({ circuits: formattedCircuits });
            }).catch(() => {
                console.log(this.props);
            });
        } else {
            api.get('my-circuits').then((data) => {
                this.setState({ circuits: data });
            }).catch(() => {
                console.log(this.props);
            });
        }
    }

    render() {
        const { dropdownOpen, filter, achievedFilter, circuits } = this.state;
        const { isAdmin } = this.props;
        const showPublished = (filter === 'Publiés');

        return (
            <>
                <div className='my-circuits-header'>
                    {isAdmin === 'home' && <h1>Circuits environnants</h1>}
                    {isAdmin === 'created' && <h1>Circuits crées</h1>}
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
                                >{achievedFilter}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem
                                        name='Tous'
                                        onClick={this.onAchievedFilterClick}
                                    >Tous
                                    </DropdownItem>
                                    <DropdownItem
                                        name='Publiés'
                                        onClick={this.onAchievedFilterClick}
                                    >En cours
                                    </DropdownItem>
                                    <DropdownItem
                                        name='Non-publiés'
                                        onClick={this.onAchievedFilterClick}
                                    >En pause
                                    </DropdownItem>
                                    <DropdownItem
                                        name='Non-publiés'
                                        onClick={this.onAchievedFilterClick}
                                    >Abandonnés
                                    </DropdownItem>
                                    <DropdownItem
                                        name='Non-publiés'
                                        onClick={this.onAchievedFilterClick}
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
                        items={circuits.filter(element => element.published === (showPublished))}
                        isAdmin={isAdmin}
                    />
                }

            </>
        );
    }

}
