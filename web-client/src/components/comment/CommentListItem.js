import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Comment, Avatar, Rate } from 'antd';
import 'antd/dist/antd.css';

class CommentListItem extends Component {

    state = {}

    render() {

        const { comment, stars, User, createdAt, version } = this.props;
        const { firstname, lastname } = User;
        const formattedDate = new Date(createdAt).toLocaleDateString();

        return (
            <div className='comment-starts-wrapper'>
                <Comment
                    author={`${firstname} ${lastname}`}
                    avatar={(
                        <Avatar
                            src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
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
