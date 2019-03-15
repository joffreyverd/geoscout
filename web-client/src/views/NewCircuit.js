import React, { Component } from 'react';
import { Button } from 'reactstrap';

import Map from '../components/Map';
import StepList from '../components/step/StepList';
import UpdateStepModal from '../components/step/UpdateStepModal';
import UpdateCircuitModal from '../components/circuit/UpdateCircuitModal';

import api from '../utils/httpMethods';

export default class NewCircuit extends Component {

    state = {
        circuit: {},
        steps: [],
        circuitIsDisplayed: false,
        stepIsDisplayed: false,
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        if (id) {
            api.get(`circuit/${id}`).then((circuit) => {
                api.get(`steps/${id}`).then((steps) => {
                    this.setState({
                        circuit: circuit,
                        steps: steps,
                    });
                });
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    onClickItem = (step) => {
        this.setState({ stepFocus: step, stepIsDisplayed: true, circuitIsDisplayed: false });
    }

    // Création d'une étape dans la base
    handleClickMap = (event) => {
        const { circuit } = this.state;
        const step = {
            name: 'Etape',
            longitude: event.lngLat[0],
            latitude: event.lngLat[1],
            id_circuit: circuit.id_circuit,
        };

        api.post('step', step).then((data) => {
            this.setState((prev) => {
                prev.steps.push(data);
                return { steps: prev.steps };
            });
        }).catch(error => console.log(error.text));
    }

    removeStep = (idx) => {
        const step = this.state.steps[idx];
        api.delete(`step/${step.id_step}`).then(() => {
            // Suppression de l'étape dans la liste
            this.setState((prev) => {
                prev.steps.splice(idx, 1);
                return { steps: prev.steps };
            });
        }).catch(error => console.log(error.text));
    }

    updateStep = step => api.put(`step/${step.id_step}`, step).then(() => {
        this.setState((prev) => {
            prev.steps.splice(step.order, 1, step);
        });
    })

    updateCircuit = circuit => api.put(`circuit/${circuit.id_circuit}`, circuit).then(() => {
        this.setState({
            circuit,
        });
    })

    changeStepOrder = (prevIdx, newIdx) => {
        this.setState((prev) => {
            const step = prev.step.splice(prevIdx, 1)[0];
            // inserts at newIdx position
            prev.steps.splice(newIdx, 0, step);
            return { steps: prev.steps };
        });
    }

    displayUpdateCircuit = () => {
        this.setState(previousState => ({
            circuitIsDisplayed: !previousState.circuitIsDisplayed,
            stepIsDisplayed: false,
        }));
    }

    displayUpdateStep = () => {
        this.setState(previousState => ({
            stepIsDisplayed: !previousState.stepIsDisplayed,
            circuitIsDisplayed: false,
        }));
    }

    render() {
        const { steps, stepFocus, circuit, circuitIsDisplayed, stepIsDisplayed } = this.state;

        return (
            <div className='view-wrapper'>
                <Map
                    className='new-map'
                    steps={steps}
                    onClickMap={this.handleClickMap}
                    onClickMarker={this.onClickItem}
                />

                <div className='scroll-menu'>

                    <div className='circuit-title'>
                        <h3>{circuit.name}</h3>
                        <Button
                            className='update-circuit-button'
                            onClick={this.displayUpdateCircuit}
                            color='info'
                        >Modifier
                        </Button>
                    </div>

                    <StepList
                        items={steps}
                        onClickItem={this.onClickItem}
                    />

                </div>
                <UpdateStepModal
                    step={stepFocus}
                    removeStep={this.removeStep}
                    updateStep={this.updateStep}
                    show={stepIsDisplayed}
                    displayUpdateStep={this.displayUpdateStep}
                />

                <UpdateCircuitModal
                    circuit={circuit}
                    show={circuitIsDisplayed}
                    displayUpdateCircuit={this.displayUpdateCircuit}
                    updateCircuit={this.updateCircuit}
                />

            </div>
        );
    }

}
