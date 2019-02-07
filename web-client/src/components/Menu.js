import React from 'react';
import {Link} from 'react-router-dom';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Menu extends React.Component {
    state = {
        isConnected : true
    }

    render() {
        const { isConnected } = this.state;

        return(
            <div className='menu-wrapper'>

                <div className='logo'>
                    <img src='/img/logo.png' alt='logo'/>
                    <p>GeoScout</p>
                </div>
                
            {isConnected && 
                <div className='menu-items'>
                    <p>Home</p>
                    <p>Mes circuits</p>
                    <p>Accomplissements</p>
                    <p>Se déconnecter</p>
                </div>
            }
                <Link to='/my-account' className='menu-options'>
                    <Button>
                        <FontAwesomeIcon icon="user" />
                    </Button>
                </Link>

            </div>
        );
    }
}
