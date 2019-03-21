import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import '../css/app.css';
import CreatedCircuitList from '../components/circuit/CreatedCircuitList';

import api from '../utils/httpMethods';

export default class CreatedCircuit extends Component {

    state = {
        dropdownOpen: false,
        filter: 'Tous',
        circuits: [],
    };

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
        });
    }

    onFilterClick = (event) => {
        this.setState({ filter: event.target.name });
    }

    componentDidMount = () => {
        api.get('my-circuits').then((data) => {
            this.setState({ circuits: data });
        }).catch(error => console.log(error));
    }

    render() {
        const { dropdownOpen, modal, filter, circuits } = this.state;
        const showPublished = (filter === 'Publiés');

        return (
            <>
                <div className='my-circuits-header'>

                    <h1>Circuits créés</h1>

                    <div className='header-buttons'>

                        <ButtonDropdown
                            direction='left'
                            className='button-dropdown'
                            isOpen={dropdownOpen}
                            toggle={this.toggle}
                        >
                            <DropdownToggle caret color='info'>{filter}</DropdownToggle>
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

                </div>
                {filter === 'Tous' ?
                    <CreatedCircuitList
                        items={circuits}
                    />
                    :
                    <CreatedCircuitList
                        items={circuits.filter(element => element.published === (showPublished))}
                    />
                }
            </>
        );
    }

}
