import React, { Component } from 'react';

import CircuitsView from './CircuitsView';

export default class Circuits extends Component {

    state = {
        isAdmin: 'created',
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
