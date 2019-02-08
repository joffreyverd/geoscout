import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink } from 'reactstrap';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isConnected : true,
            isOpen : false
        };
      }
      toggle = () => {
        this.setState((previousState) => ({
            isOpen : !previousState.isOpen
        }));
      }

    render() {
        const { isConnected, isOpen } = this.state;

        return(
            <div>
                <Navbar expand='md'>

                    <Link to='/'>
                        <img src='/img/logo.png' className='logo' alt='GeoScout'/>
                    </Link>
                    <NavbarToggler onClick={this.toggle}/>

                    {isConnected && 
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className='ml-auto' navbar>
                            <NavItem>
                                <Link to='/circuits'>Mes circuits</Link>
                            </NavItem>
                            <NavItem>
                                <Link to='/achieved-circuits'>Accomplissements</Link>
                            </NavItem>
                            <NavItem>
                                <Link to='/'>Se déconnecter</Link>
                            </NavItem>
                        </Nav>
                    </Collapse>
                    }

                    <Link to='/informations'>
                        <FontAwesomeIcon icon='user' className='user-icon'/>
                    </Link>

                </Navbar>
            </div>
        );
    }
}
