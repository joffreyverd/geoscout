import React, {Component} from 'react';
import '../css/app.css';
import Map from '../components/Map';

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

                            <div className='step-wrapper'>
                                etape 1
                            </div>

                            <div className='step-wrapper'>
                                etape 2
                            </div>

                        </div>
                    </div>
                }
            </>
        );
    }
}
