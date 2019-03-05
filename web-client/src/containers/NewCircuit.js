import React, {Component} from 'react';
import '../css/app.css';
import NewMap from '../components/NewMap';

export default class NewCircuit extends Component {

    render() {
        console.log(this.state);
        return (
            <>
                {this.props.location.state &&
                    <p>{this.props.location.state.name}</p>
                }

                <NewMap />
            </>
        );
    }
}
