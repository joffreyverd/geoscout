import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';

class RelationsListItem extends Component {

    state = {}

    render() {

        const { firstname, lastname } = this.props;

        return (
            <>
                <div className='relation-item'>
                    <div className='little-avatar-picture' />
                    <p className='user-relation-item'>{`${firstname} ${lastname}`}</p>
                    <div>
                        <Button>Supprimer</Button>
                    </div>
                </div>

            </>
        );
    }

}

export default withRouter(RelationsListItem);
