import React, {Component} from 'react';
import '../css/app.css';
import NewMap from '../components/NewMap';
import StepList from '../components/step/StepList';

const Steps = [{name: 'étape 1'}, {name: 'étape 2'}, {name: 'étape 3'}, {name: 'étape 3'}, {name: 'étape 3'}, {name: 'étape 3'}, {name: 'étape 3'}, {name: 'étape 3'}, {name: 'étape 3'}];

export default class NewCircuit extends Component {

    render() {
        return (
            <>
                {this.props.location.state &&
                    <div className='view-wrapper'>
                        <NewMap/>

                        <div className='scroll-menu'>
    
                            <h3 className='circuit-title'>{this.props.location.state.name}</h3>

                            <StepList
                                items={Steps}/>

                        </div>
                    </div>
                }
            </>
        );
    }
}
