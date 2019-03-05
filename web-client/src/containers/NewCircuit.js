import React, { Component } from 'react';
import Map from '../components/Map';
import StepList from '../components/step/StepList';
import api from '../utils/httpMethods';

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

    componentDidMount() {
        if (this.props.match.params.id) {
            api.get('circuits')
        }
    }

    handleClickMap = (event) => {
        let step = { longitude: event.lngLat[0], latitude: event.lngLat[1] }

        // Supprimer ce setState lors de la connexion
        this.setState((prev) => {
            prev.steps.push(step)
            return { steps: prev.steps }
        })

        // api.post('step',step).then((data) => {
        //     this.setState((prev) => {
        //         prev.steps.push(step)
        //         return { steps: prev.steps}
        //     })
        // }).catch((error) => console.log(error.text))

    }

    removeStep = (idx) => {
        // Suppression de l'étape dans la liste
        this.setState((prev) => {
            prev.steps.splice(idx, 1)
            return { steps: prev.steps }
        })

        // let step = this.state.steps[idx];
        // api.delete(`step/${step.id}`).then(() => {
        //     // Suppression de l'étape dans la liste
        //     this.setState((prev) => {
        //         prev.steps.splice(idx,1)
        //         return { steps: prev.steps}
        //     })
        // }).catch((error) => console.log(error.text))
    }

    changeStepOrder = (prevIdx, newIdx) => {
        this.setState((prev) => {
            let step = prev.step.splice(prevIdx, 1)[0]
            // inserts at newIdx position
            prev.steps.splice(newIdx, 0, step)
            return { steps: prev.steps }
        })
    }

    render() {
        const { steps } = this.state;
        const { match: { params: { name } } } = this.props;
        console.log(this.props)

        return (
            <div className='view-wrapper'>
                <Map
                    class='new-map'
                    steps={steps}
                    handleClick={this.handleClickMap}
                    removeMarker={this.removeStep} />

                <div className='scroll-menu'>

                    <h3 className='circuit-title'>{name}</h3>

                    <StepList
                        items={Steps} />

                </div>
            </div>
        );
    }
}
