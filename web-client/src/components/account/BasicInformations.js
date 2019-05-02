import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class BasicInformations extends Component {

    state = {}

    render() {

        const { user } = this.props;
        // {`published ${user.firstname}`}

        return (
            <>
                <div className='basic-informations-wrapper'>
                    <h2>{`${user.firstname} ${user.lastname}`}</h2>
                    <p>{`@${user.firstname}`}</p>
                    <p>{user.email}</p>
                    <p>Strasbourg</p>
                    <p>Inscrit depuis Mai 2017</p>
                </div>

            </>
        );
    }

}

export default withRouter(BasicInformations);
