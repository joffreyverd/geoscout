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

                    {personnalStates &&
                        <>
                            <p>{`Circuits créés : ${personnalStates.circuits_created}`}</p>
                            <p>{`Circuits joués : ${personnalStates.circuits_played}`}</p>
                            <p>{`Circuits commentés : ${personnalStates.comments_posted}`}</p>
                        </>
                    }

                </div>

            </>
        );
    }

}

export default withRouter(BasicInformations);
