import React from 'react';
import CommentListItem from './CommentListItem';

export default ({ items = [] }) => (
    <>
        <h2 className='comments-title'>Commentaires</h2>
        <ul className='comments-wrapper'>
            {items.map(item => <CommentListItem key={item.id} {...item} />)}
        </ul>
    </>
);
