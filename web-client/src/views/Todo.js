import React, { Component } from 'react';

import CircuitsView from './CircuitsView';

export default class Todo extends Component {

    state = {
        isAdmin: 'favorites',
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
