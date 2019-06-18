import React from 'react';
import Comment from './Comment';

export default function ListComment(props) {
    const { evaluations, navigate } = props;
    return evaluations.map(item => (
        <Comment
            key={item.id}
            navigate={navigate}
            user={item.User}
            comment={item.comment}
            id_comment={item.id}
            rate={item.stars}
            version={item.version}
            date={item.createdAt}
            styleComment={{
                flexDirection: 'column',
                alignSelf: 'flex-start',
                width: '100%',
                padding: 10,
                backgroundColor: '#dedede',
                marginBottom: 10,
                borderRadius: 5
            }}
        />
    ));
}

// Object {
//     "comment": "Un circuit pour les petits et les grands",
//     "createdAt": "2019-05-24T08:06:53.000Z",
//     "id": 13,
//     "id_circuit": 37,
//     "id_user": 4,
//     "stars": 5,
//     "updatedAt": "2019-05-24T08:06:53.000Z",
//     "version": 0,
//   }
