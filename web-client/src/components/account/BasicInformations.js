import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class BasicInformations extends Component {

    state = {}

    render() {

        const { user, personnalStates } = this.props;

        return (
            <>
                <div className='basic-informations-wrapper'>
                    <h2>{`${user.firstname} ${user.lastname}`}</h2>
                    <p>{user.email}</p>
                    <p>Strasbourg</p>
                    <p>Inscrit depuis Mai 2017</p>

                    {personnalStates &&
                        <>
                            <p>{`Ciruits crées : ${personnalStates.circuits_created}`}</p>
                            <p>{`Ciruits joués : ${personnalStates.circuits_played}`}</p>
                            <p>{`Ciruits commentés : ${personnalStates.comments_posted}`}</p>
                        </>
                    }

                </div>

            </>
        );
    }

}

export default withRouter(BasicInformations);
