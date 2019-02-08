import React from 'react';
import { 
    Collapse, 
    Navbar, 
    NavbarToggler, 
    Nav, 
    NavItem,
} from 'reactstrap';
import {Link} from 'react-router-dom';
import Authentification from './authentification/Authentification';

export default class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isConnected : true,
            responsiveNavBarMode : false,
        };
      }
      toggle = () => {
        this.setState((previousState) => ({
            responsiveNavBarMode : !previousState.responsiveNavBarMode
        }));
      }

    render() {
        const {isConnected, responsiveNavBarMode} = this.state;

        return(
            <div>
                <Navbar expand='md'>

                    <Link to='/'>
                        <img src='/img/logo.png' className='logo' alt='GeoScout'/>
                    </Link>
                    <NavbarToggler onClick={this.toggle}/>

                    {isConnected && 
                    <Collapse responsiveNavBarMode={responsiveNavBarMode} navbar>
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
                    <Authentification isConnected={isConnected}/>
                </Navbar>
            </div>
        );
    }
}
