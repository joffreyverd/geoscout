import React, { Component } from 'react';
import '../css/app.css';
import {Link} from 'react-router-dom';
import {ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import CreatedCircuitList from '../components/circuit/CreatedCircuitList';

const Circuits = [{
    idCircuit: 1,idUser: 3,name: 'Les Vosges',description: 'C\'est une super randonnée !',
    length: '21km',duration: '8 heures',needInternet: false,published: true,version: 3,level: 'intermédiaire'
    },
    {
    idCircuit: 2,idUser: 3,name: 'Les Alpes',description: 'C\'est une super randonnée encore mieux !',
    length: '17km',duration: '11 heures',needInternet: false,published: false,version: 1,level: 'avancé'
    },
    {
    idCircuit: 2,idUser: 3,name: 'Les Alpes',description: 'C\'est une super randonnée encore mieux !',
    length: '17km',duration: '11 heures',needInternet: false,published: false,version: 1,level: 'avancé'
    }
];

export default class CreatedCircuit extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          dropdownOpen: false
        };
      }
    
    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        return (
            <>
                <div className='my-circuits-header'>

                    <h1>Circuits crées</h1>

                    <ButtonDropdown
                        direction="left"
                        className='button-dropdown'
                        isOpen={this.state.dropdownOpen}
                        toggle={this.toggle}>
                        <DropdownToggle caret>Recherche avancée</DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem>Tous</DropdownItem>
                            <DropdownItem>Circuits publiés</DropdownItem>
                            <DropdownItem>Circuits non-publiés</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>

                </div>

                <CreatedCircuitList
                    items={Circuits}/>

                <Link to='/new-circuit' className='add-circuit'>
                    <FontAwesomeIcon icon='plus-circle' size='3x' color='#3B62FF'/>
                </Link>
            </>
        );
    }
}
