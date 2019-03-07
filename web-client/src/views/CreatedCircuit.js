import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../css/app.css';
import CreatedCircuitList from '../components/circuit/CreatedCircuitList';
import CreateCircuitModal from '../components/circuit/CreateCircuitModal';

import api from '../utils/httpMethods';

export default class CreatedCircuit extends Component {

    state = {
        dropdownOpen: false,
        filter: 'all',
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
        const showPublished = (filter === 'published');

        return (
            <>
                <div className='my-circuits-header'>

                    <h1>Circuits crées</h1>

                    <ButtonDropdown
                        direction='left'
                        className='button-dropdown'
                        isOpen={dropdownOpen}
                        toggle={this.toggle}
                    >
                        <DropdownToggle caret>Recherche avancée</DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem
                                name='all'
                                onClick={this.onFilterClick}
                            >Tous
                            </DropdownItem>
                            <DropdownItem
                                name='published'
                                onClick={this.onFilterClick}
                            >Circuits publiés
                            </DropdownItem>
                            <DropdownItem
                                name='unpublished'
                                onClick={this.onFilterClick}
                            >Circuits non-publiés
                            </DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>

                </div>
                {filter === 'all' ?
                    <CreatedCircuitList
                        items={circuits}
                    />
                    :
                    <CreatedCircuitList
                        items={circuits.filter(element => element.published === (showPublished))}
                    />
                }

                <FontAwesomeIcon
                    className='add-circuit'
                    onClick={this.displayModal}
                    icon='plus-circle'
                    size='3x'
                    color='#3B62FF'
                />

                <CreateCircuitModal
                    displayModal={this.displayModal}
                    modal={modal}
                />
            </>
        );
    }

}
