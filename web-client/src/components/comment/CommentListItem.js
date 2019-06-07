import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Comment, Avatar, Rate } from 'antd';
import 'antd/dist/antd.css';

class CommentListItem extends Component {

    state = {}

    render() {

        const { comment, stars, User } = this.props;
        const { firstname, lastname } = User;

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
                />
                <Rate disabled defaultValue={stars} />
            </div>
        );
    }

}

export default withRouter(CommentListItem);
