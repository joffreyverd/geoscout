import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import '../css/app.css';
import CreatedCircuitList from '../components/circuit/CircuitList';

import api from '../utils/httpMethods';

export default class CircuitsView extends Component {

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
        const { onHome, circuits } = this.props;
        if (onHome) {
            this.setState({
                circuits: circuits,
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
        const { dropdownOpen, filter, circuits } = this.state;
        const { onHome } = this.props;
        const showPublished = (filter === 'Publiés');

        return (
            <>
                <div className='my-circuits-header'>

                    {onHome
                        ?
                        <h1>Circuits environnants</h1>

                        :
                        <>
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
                        </>
                    }

                </div>
                {filter === 'Tous' ?
                    <CreatedCircuitList
                        items={circuits}
                        onHome={onHome}
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
