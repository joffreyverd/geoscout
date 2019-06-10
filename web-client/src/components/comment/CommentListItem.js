import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Comment, Avatar, Rate } from 'antd';
import 'antd/dist/antd.css';

import api from '../../utils/httpMethods';

class CommentListItem extends Component {

    state = {}

    componentDidMount() {
        const { User } = this.props;
        api.post('download', {
            id: User.id_user,
            type: 'user',
        }).then((img) => {
            this.setState({ img });
        }).catch(() => {
            console.log('error');
        });
    }

    render() {

        const { comment, stars, User, createdAt, version } = this.props;
        const { img } = this.state;
        const { firstname, lastname } = User;
        const formattedDate = new Date(createdAt).toLocaleDateString();
        const defaultImg = '/img/earth.png';

        return (
            <div className='comment-starts-wrapper'>
                <Comment
                    author={`${firstname} ${lastname}`}
                    avatar={(
                        <Avatar
                            src={!img || img.length < 1 || img === undefined ? defaultImg : `http://www.geoscout.fr:5555${img}`}
                            alt={`${firstname} ${lastname}`}
                        />
                    )}
                    content={comment}
                    datetime={
                        <span>{formattedDate}</span>
                    }
                />
                <Rate disabled defaultValue={stars} />
                <p className='version-tag'>{(version && version !== undefined) ? `Version ${version}` : 'Version 1'}</p>
            </div>
        );
    }

}

export default withRouter(CommentListItem);
