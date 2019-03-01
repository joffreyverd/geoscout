import React, {Component} from 'react';
import '../css/app.css';
import NewMap from '../components/NewMap';

export default class NewCircuit extends Component {
    state = {
        steps: []
    }

    handleClickMap = (event) => {
        let steps = this.state.steps
        steps.push({ longitude: event.lngLat[0], latitude: event.lngLat[1]})
        this.setState({ steps: steps})
    }

    removeMarker = (idx) => {
        // Suppression de l'étape dans la liste
        this.setState((prev) => {
            prev.steps.splice(idx,1)
            return { steps: prev.steps}
        })
    }


    render() {
        const {steps} = this.state
        return (
            <>
                {this.props.location.state &&
                    <div className='div-wrapper'>
                        <NewMap 
                            steps={steps}
                            handleClick={this.handleClickMap}
                            removeMarker={this.removeMarker} />

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
