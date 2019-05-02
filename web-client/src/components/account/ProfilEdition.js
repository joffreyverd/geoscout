import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class ProfilEdition extends Component {

    state = {}

    render() {
        return (
            <>
                <div className='feed-wrapper'>
                    <h2>Editer mon profil</h2>
                </div>

            </>
        );
    }

}

export default withRouter(ProfilEdition);
