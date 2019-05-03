import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class UserFeed extends Component {

    state = {}

    render() {
        return (
            <>
                <div className='feed-wrapper'>
                    <h2>Activité récente</h2>
                </div>

            </>
        );
    }

}

export default withRouter(UserFeed);
