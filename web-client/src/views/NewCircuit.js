import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { DragDropContext } from 'react-beautiful-dnd';

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

    /**
     * Création d'une étape dans la base
     * @param {Event} event : event envoyé
     */
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

    /**
     * Suppression d'une étape sur le serveur puis dans le state
     * @param {Integer} idx : L'index de l'étape dans le tableau steps du state
     */
    removeStep = (id_step) => {
        api.delete(`step/${id_step}`).then(() => {
            // Suppression de l'étape dans la liste
            this.setState((prev) => {
                const idx = prev.steps.findIndex(element => element.id_step === id_step);
                prev.steps.splice(idx, 1);
                return { steps: prev.steps };
            });
            this.displayUpdateStep();
        }).catch(error => console.log(error.text));
    }

    /**
     * Modification d'une étape
     * @param {Object} step : L'objet étape modifié
     */
    updateStep = step => api.put(`step/${step.id_step}`, step).then(() => {
        this.setState((prev) => {
            prev.steps.splice(prev.steps.findIndex(s => s.id_step === step.id_step), 1, step);
        });
    })

    /**
     * Modification du circuit
     * @param {Object} circuit : L'objet circuit modifié
     */
    updateCircuit = circuit => api.put(`circuit/${circuit.id_circuit}`, circuit).then(() => {
        this.setState({
            circuit,
        });
    })

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

    dragEnd = (dropResult) => {
        if (dropResult.destination) {
            const {
                draggableId: id,
                source: {
                    index: prevOrder,
                },
                destination: {
                    index: newOrder,
                },
            } = dropResult;


            const { circuit: { id_circuit } } = this.state;

            this.changeStepOrder(prevOrder, newOrder);

            api.put('step/order', {
                id: id,
                id_circuit: id_circuit,
                previous: prevOrder,
                new: newOrder,
            })
                .then(() => null)
                .catch((error) => {
                    console.log(error);
                    this.changeStepOrder(newOrder, prevOrder);
                });

            console.log(`${id} : ${prevOrder} => ${newOrder}`);
        }
    }

    /**
     * Fonction de modification de l'ordre des questions dans le state
     * @param {Integer} prevOrder : L'ordre de l'étape à déplacer
     * @param {Integer} newOrder : Le nouvel ordre de l'étape
     */
    changeStepOrder = (prevOrder, newOrder) => {
        this.setState((prev) => {
            const steps = prev.steps.map((step) => {

                if (step.order === parseInt(prevOrder)) {
                    step.order = newOrder;
                } else if (newOrder <= step.order && step.order < prevOrder) {
                    step.order += 1;
                } else if (step.order > prevOrder && step.order <= newOrder) {
                    step.order -= 1;
                }

                return step;
            });
            steps.sort((a, b) => a.order - b.order);
            return { steps: steps };
        });
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

                    <DragDropContext
                        onDragEnd={this.dragEnd}
                    >
                        <StepList
                            items={steps}
                            onClickItem={this.onClickItem}
                        />
                    </DragDropContext>

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
