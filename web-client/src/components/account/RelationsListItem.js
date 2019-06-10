import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';

import api from '../../utils/httpMethods';

class RelationsListItem extends Component {

    state = {}

    componentDidMount() {
        const { id_user } = this.props;
        api.post('download', {
            id: id_user,
            type: 'user',
        }).then((img) => {
            this.setState({ img });
        }).catch(() => {
            console.log('error');
        });
    }

    render() {

        const { firstname, lastname } = this.props;
        const { img } = this.state;
        const defaultImg = '/img/earth.png';

        return (
            <>
                <div className='relation-item'>
                    <img
                        className='little-avatar-picture'
                        src={!img || img.length < 1 || img === undefined ? defaultImg : `http://www.geoscout.fr:5555${img}`}
                        alt={firstname}
                    />
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
