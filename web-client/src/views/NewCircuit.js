import React, { Component } from 'react';
import Map from '../components/Map';
import StepList from '../components/step/StepList';
import UpdateStepModal from '../components/step/UpdateStepModal';
import api from '../utils/httpMethods';

export default class NewCircuit extends Component {

    state = {
        circuit: {},
        steps: [],
        modalOpen: false
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        if (id) {
            api.get(`circuit/${id}`).then((circuit) => {
                api.get(`steps/${id}`).then((steps) => {
                    this.setState({
                        circuit: circuit,
                        steps: steps
                    });
                });
            }).catch((error) => {
                console.log(error)
            })
        }
    }

    displayModal = () => {
        this.setState(previousState => ({
            modalOpen: !previousState.modalOpen,
        }));
    }

    onClickItem = (step) => {
        this.setState({ stepFocus: step });
        this.displayModal();
    }

    // Création d'une étape dans la base
    handleClickMap = (event) => {
        const { steps, circuit } = this.state;
        const index = steps.length;
        const step = {
            name: `Etape ${index}`,
            longitude: event.lngLat[0],
            latitude: event.lngLat[1],
            id_circuit: circuit.id_circuit
        };

        api.post('step', step).then((data) => {
            this.setState((prev) => {
                prev.steps.push(data);
                return { steps: prev.steps };
            })
        }).catch((error) => console.log(error.text))
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

    updateStep = (step) => {
        return api.put(`step/${step.id_step}`, step).then(() => {
            this.setState((prev) => {
                prev.steps.splice(step.order, 1, step);
            })
        })
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
        const { steps, circuit, stepFocus, modalOpen } = this.state;

        return (
            <div className='view-wrapper'>
                <Map
                    class='new-map'
                    steps={steps}
                    handleClick={this.handleClickMap}
                    removeMarker={this.removeStep}
                />

                <div className='scroll-menu'>

                    <h3 className='circuit-title'>{circuit.name}</h3>

                    <StepList
                        items={steps}
                        onClickItem={this.onClickItem}
                    />

                </div>
                <UpdateStepModal step={stepFocus}
                    open={modalOpen}
                    displayModal={this.displayModal}
                    updateStep={this.updateStep}
                />
            </div>
        );
    }

}
