import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class BasicInformations extends Component {

    state = {}

    render() {

        const { user } = this.props;
        // {`${user.firstname} ${user.lastname}`}
        // {user.email}

        return (
            <>
                <div className='basic-informations-wrapper'>
                    <h2>Joffrey Verd</h2>
                    <p>jverd@protonmail.com</p>
                    <p>Strasbourg</p>
                    <p>Inscrit depuis Mai 2017</p>
                </div>

            </>
        );
    }

}

export default withRouter(BasicInformations);
