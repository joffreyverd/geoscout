import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Rate } from 'antd';
import 'antd/dist/antd.css';

class OpinionListItem extends Component {

    state = {}

    render() {

        const { stars, comment, name, id_circuit, history } = this.props;

        return (
            <>
                <div className='opinion-wrapper'>
                    <div className='name-rate'>
                        <h3 onClick={() => history.push(`detail/${id_circuit}`)}>{name}</h3>
                        <Rate disabled defaultValue={stars} />
                    </div>
                    <p>{`"${comment}"`}</p>
                </div>

            </>
        );
    }

}

export default withRouter(OpinionListItem);
