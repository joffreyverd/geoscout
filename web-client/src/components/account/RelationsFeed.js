import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import RelationsList from './RelationsList';

class RelationsFeed extends Component {

    state = {}

    render() {

        const { relations } = this.props;

        return (
            <>
                <div className='feed-wrapper'>
                    <h2>Relations</h2>
                    <RelationsList items={relations} />
                </div>

            </>
        );
    }

}

export default withRouter(RelationsFeed);
