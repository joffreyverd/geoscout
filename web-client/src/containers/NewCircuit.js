import React, {Component} from 'react';
import '../css/app.css';

export default class NewCircuit extends Component {

    render() {
        return (
            <>
                <h1>Créer un nouveau circuit :)</h1>

                {this.props.location.state &&
                    <p>{this.props.location.state.name}</p>
                }

            </>
        );
    }
}
