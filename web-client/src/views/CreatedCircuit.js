import React, { Component } from 'react';
import {
    ButtonDropdown, DropdownToggle,
    DropdownMenu, DropdownItem, Button,
} from 'reactstrap';

import '../css/app.css';
import CreatedCircuitList from '../components/circuit/CreatedCircuitList';
import CreateCircuitModal from '../components/circuit/CreateCircuitModal';

import api from '../utils/httpMethods';

export default class CreatedCircuit extends Component {

    state = {
        dropdownOpen: false,
        filter: 'Tous',
        modal: false,
        circuits: [],
    };

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
        });
    }

    displayModal = () => {
        this.setState(previousState => ({
            modal: !previousState.modal,
        }));
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

                        <Button
                            color='success'
                            className='create-circuit'
                            onClick={this.displayModal}
                        >Création
                        </Button>

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

                <CreateCircuitModal
                    displayModal={this.displayModal}
                    modal={modal}
                />
            </>
        );
    }

}
