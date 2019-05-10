import React, { Component } from 'react';

import CircuitsView from './CircuitsView';

export default class Achievement extends Component {

    state = {
        isAdmin: 'achieved',
    }

    render() {

        const { isAdmin } = this.state;

        return (
            <>
                <CircuitsView isAdmin={isAdmin} />
            </>
        );
    }

}
