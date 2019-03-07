import React, { Component } from 'react';
import Map from '../components/Map';
import StepList from '../components/step/StepList';
import api from '../utils/httpMethods';

export default class NewCircuit extends Component {

    state = {
        steps: [],
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        if (id) {
            api.get('circuits');
        }
    }

    handleClickMap = (event) => {
        const { steps } = this.state;
        const index = steps.length;
        const step = {
            name: `Etape ${index}`,
            longitude: event.lngLat[0],
            latitude: event.lngLat[1],
            order: index,
        };

        api.post('step', step).then((data) => {
            this.setState((prev) => {
                prev.steps.push(step);
                return { steps: prev.steps };
            });
        }).catch(error => console.log(error.text));

    }

    removeStep = (idx) => {
        const step = this.state.steps[idx];
        api.delete(`step/${step.id}`).then(() => {
            // Suppression de l'étape dans la liste
            this.setState((prev) => {
                prev.steps.splice(idx, 1);
                return { steps: prev.steps };
            });
        }).catch(error => console.log(error.text));
    }

    changeStepOrder = (prevIdx, newIdx) => {
        this.setState((prev) => {
            const step = prev.step.splice(prevIdx, 1)[0];
            // inserts at newIdx position
            prev.steps.splice(newIdx, 0, step);
            return { steps: prev.steps };
        });
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
                    removeMarker={this.removeStep}
                />

                <div className='scroll-menu'>

                    <h3 className='circuit-title'>{name}</h3>

                    <StepList
                        items={steps}
                    />

                </div>
            </div>
        );
    }

}
