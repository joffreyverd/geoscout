import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class RelationsFeed extends Component {

    state = {}

    render() {
        return (
            <>
                <div className='feed-wrapper'>
                    <h2>Relations</h2>
                </div>

            </>
        );
    }

}

export default withRouter(RelationsFeed);
