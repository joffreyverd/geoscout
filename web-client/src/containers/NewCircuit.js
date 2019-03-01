import React, {Component} from 'react';
import Map from '../components/Map';
import '../css/app.css';
import StepList from '../components/step/StepList';

const Steps = [{name: 'étape 1'}, {name: 'étape 2'}, {name: 'étape 3'}, {name: 'étape 3'}, {name: 'étape 3'}, {name: 'étape 3'}, {name: 'étape 3'}, {name: 'étape 3'}, {name: 'étape 3'}];

export default class NewCircuit extends Component {
    state = {
        steps: []
    }

    handleClickMap = (event) => {
        let steps = this.state.steps
        steps.push({ longitude: event.lngLat[0], latitude: event.lngLat[1] })
        this.setState({ steps: steps})
    }

    removeStep = (idx) => {
        // Suppression de l'étape dans la liste
        this.setState((prev) => {
            prev.steps.splice(idx,1)
            return { steps: prev.steps}
        })
    }

    changeStepOrder = (prevIdx, newIdx) => {
        this.setState((prev) => {
            let step = prev.step.splice(prevIdx, 1)[0]
            // inserts at newIdx position
            prev.steps.splice(newIdx, 0, step)
            return { steps: prev.steps}
        })
    }

    render() {
        const {steps} = this.state;
        return (
            <>
                {this.props.location.state &&
                    <div className='div-wrapper'>
                        <Map 
                            class='new-map'
                            steps={steps}
                            handleClick={this.handleClickMap}
                            removeMarker={this.removeStep} />

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
