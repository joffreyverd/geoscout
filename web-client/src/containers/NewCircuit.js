import React, { Component } from 'react';

import Map from '../components/Map';
import '../css/app.css';
import StepList from '../components/step/StepList';

const Steps = [
    { name: 'étape 1', description: 'ceci est une étape', order: 1 },
    { name: 'étape 2', description: 'ceci est une étape', order: 2 },
    { name: 'étape 3', description: 'ceci est une étape', order: 3 },
    { name: 'étape 4', description: 'ceci est une étape', order: 4 },
    { name: 'étape 5', description: 'ceci est une étape', order: 5 },
    { name: 'étape 6', description: 'ceci est une étape', order: 6 },
    { name: 'étape 7', description: 'ceci est une étape', order: 7 },
    { name: 'étape 8', description: 'ceci est une étape', order: 8 },
    { name: 'étape 9', description: 'ceci est une étape', order: 9 }
];

export default class NewCircuit extends Component {
    state = {
        steps: []
    }

    handleClickMap = (event) => {
        let steps = this.state.steps
        steps.push({ longitude: event.lngLat[0], latitude: event.lngLat[1] })
        this.setState({ steps: steps })
    }

    removeMarker = (idx) => {
        // Suppression de l'étape dans la liste
        this.setState((prev) => {
            prev.steps.splice(idx, 1)
            return { steps: prev.steps }
        })
    }


    render() {
        const { steps } = this.state;
        const { match: { params: { name } } } = this.props;

        return (
            <div className='view-wrapper'>
                <Map
                    class='new-map'
                    steps={steps}
                    handleClick={this.handleClickMap}
                    removeMarker={this.removeMarker} />

                <div className='scroll-menu'>

                    <h3 className='circuit-title'>{name}</h3>

                    <StepList
                        items={Steps} />

                </div>
            </div>
        );
    }
}
