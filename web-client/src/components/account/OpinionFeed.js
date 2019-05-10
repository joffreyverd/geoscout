import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import OpinionList from './OpinionList';

class OpinionFeed extends Component {

    state = {}

    render() {

        const { opinions } = this.props;

        return (
            <>
                <div className='feed-wrapper'>
                    <h2>Avis</h2>
                    <OpinionList items={opinions} />
                </div>

            </>
        );
    }

}

export default withRouter(OpinionFeed);
