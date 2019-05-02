import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class OpinionFeed extends Component {

    state = {}

    render() {
        return (
            <>
                <div className='feed-wrapper'>
                    <h2>Avis</h2>
                </div>

            </>
        );
    }

}

export default withRouter(OpinionFeed);
