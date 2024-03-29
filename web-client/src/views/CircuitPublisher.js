import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { DragDropContext } from 'react-beautiful-dnd';
import { Icon, Tooltip } from 'antd';
import 'antd/dist/antd.css';

import Map from '../components/Map';
import StepList from '../components/step/StepList';
import UpdateStepModal from '../components/step/UpdateStepModal';
import UpdateCircuitModal from '../components/circuit/UpdateCircuitModal';

import api from '../utils/httpMethods';

export default class CircuitPublisher extends Component {

    state = {
        circuit: {},
        steps: [],
        stepFocus: [],
        circuitIsDisplayed: false,
        stepIsDisplayed: false,
        viewport: {
            width: '100%',
            height: window.innerHeight - 50,
            latitude: 48.582651,
            longitude: 7.749534,
            distance: 30,
            zoom: 12,
        },
    }

    componentDidMount() {
        // eslint-disable-next-line no-undef
        if (navigator.geolocation) {
            // eslint-disable-next-line no-undef
            navigator.geolocation.getCurrentPosition((data) => {
                const { viewport } = this.state;
                viewport.latitude = data.coords.latitude;
                viewport.longitude = data.coords.longitude;

                this.setState({
                    viewport: viewport,
                    userPosition: data.coords,
                });
            });
        }
        const { id } = this.props.match.params;
        if (id) {
            api.get(`download-circuit/${id}`).then((circuit) => {
                const { longitude, latitude } = (circuit.Steps[0]) ? circuit.Steps[0] : false;
                const { viewport } = this.state;

                if (latitude && longitude) {
                    viewport.latitude = latitude;
                    viewport.longitude = longitude;
                    circuit.Steps.sort((a, b) => a.order - b.order);
                    this.setState({
                        circuit: circuit,
                        steps: circuit.Steps,
                        viewport: viewport,
                    });
                    circuit.id_circuit = id;
                } else {
                    circuit.Steps.sort((a, b) => a.order - b.order);
                    this.setState({
                        circuit: circuit,
                        steps: circuit.Steps,
                    });
                }
            }).catch(() => {
                console.log('Oups, une erreur s\'est produite');
            });
            api.post('download', {
                id,
                type: 'circuit',
            }).then((img) => {
                this.setState({ img });
            }).catch(() => {
                console.log('error');
            });
        }
    }

    changeViewport = (viewport) => {
        this.setState({
            viewport: viewport,
        });
    }

    publishCircuit = () => {
        const { circuit } = this.state;
        api.put('publish-circuit', { id_circuit: circuit.id_circuit }).then(() => {
            this.setState((prevState) => {
                prevState.circuit.published = !prevState.circuit.published;
                return { circuit: prevState.circuit };
            });
        }).catch(() => {
            console.log('Oups, une erreur s\'est produite');
        });
    }

    /**
     * Fonction de gestion du clic sur une étape
     * @param {Object} step : l'objet Step qui a été cliqué
     */
    onClickItem = (step) => {
        document.getElementById('scroll-top-step').scrollIntoView({
            behavior: 'smooth',
            block: 'end',
            inline: 'nearest',
        });
        this.setState({
            stepFocus: step,
            stepIsDisplayed: true,
            circuitIsDisplayed: false,
        });
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
        }).catch(() => {
            console.log('Oups, une erreur s\'est produite');
        });
    }

    /**
     * Suppression d'une étape sur le serveur puis dans le state
     * @param {Integer} id_step : L'index de l'étape dans le tableau steps du state
     */
    removeStep = (id_step) => {
        const { circuit } = this.state;
        api.delete(`step/${circuit.id_circuit}/${id_step}`).then(() => {
            // Suppression de l'étape dans la liste
            this.setState((prev) => {
                const idx = prev.steps.findIndex(element => element.id_step === id_step);
                prev.steps.splice(idx, 1);
                prev.steps.forEach((element, index) => {
                    if (index >= idx) {
                        element.order--;
                    }
                });
                return { steps: prev.steps };
            });
            this.displayUpdateStep();
        }).catch(() => {
            console.log('Oups, une erreur s\'est produite');
        });
    }

    /**
     * Modification d'une étape
     * @param {Object} step : L'objet étape modifié
     */
    updateStep = step => api.put(`step/${step.id_step}`, { step }).then(() => {
        const { circuit } = this.state;
        const { published, version } = circuit;

        let publication = 0;
        if (published === 0) {
            publication = version;
        } else {
            publication = version + 1;
        }

        this.setState((prev) => {
            const index = prev.steps.findIndex(s => s.id_step === step.id_step);
            prev.steps[index] = step;
            circuit.version = publication;
        });
        this.updateCircuit(circuit);
    })

    /**
     * Modification du circuit
     * @param {Object} circuit : L'objet circuit modifié
     */
    updateCircuit = circuit => api.put(`circuit/${circuit.id_circuit}`, circuit).then((data) => {
        this.setState({
            circuit: data,
        });
    })

    displayUpdateCircuit = () => {
        this.setState(previousState => ({
            circuitIsDisplayed: !previousState.circuitIsDisplayed,
            stepIsDisplayed: false,
            stepFocus: null,
        }));
    }

    displayUpdateStep = () => {
        this.setState(previousState => ({
            stepIsDisplayed: !previousState.stepIsDisplayed,
            circuitIsDisplayed: false,
            stepFocus: null,
        }));
    }

    /**
     * Fonction lancé par le Drag & Drop de la liste d'étape
     * @param {Object} dropResult : Event lancé par le drop d'un Draggable dans un Droppable
     */
    dragEnd = (dropResult) => {
        if (dropResult.destination) {
            const {
                source: {
                    index: prevOrder,
                },
                destination: {
                    index: newOrder,
                },
            } = dropResult;


            const { circuit: { id_circuit } } = this.state;
            this.changeStepOrder(prevOrder, newOrder);

            api.put('step-order', {
                id_circuit: id_circuit,
                previous: prevOrder,
                new: newOrder,
            })
                .then(() => null)
                .catch(() => {
                    this.changeStepOrder(newOrder, prevOrder);
                    console.log('Oups, une erreur s\'est produite');
                });
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

    onChangePicturesList = () => {

    }

    onChangePicturesListStep = () => {

    }

    uploadCircuitPictures = (file) => {
        const formData = new FormData();
        const { id_circuit } = this.state.circuit;

        formData.append('id', id_circuit);
        formData.append('type', 'circuit');
        formData.append('file', file);

        const adress = process.env.REACT_APP_API_URL;

        return fetch(`${adress}upload`, {
            method: 'POST',
            body: formData,
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }).then(() => {
            api.post('download', {
                id: id_circuit,
                type: 'circuit',
            }).then((img) => {
                this.setState({ img });
            }).catch(() => {
                console.log('error');
            });
        });
    }

    deleteCircuitPictures = () => {
        const { id_circuit } = this.state.circuit;
        api.post('delete', {
            id: id_circuit,
            type: 'circuit',
        }).then(() => {
            this.setState({ img: [] });
        }).catch(() => {
            console.log('Oups, une erreur s\'est produite');
        });
    }

    render() {
        const { steps, stepFocus, userPosition, circuit, circuitIsDisplayed,
            stepIsDisplayed, viewport, img,
        } = this.state;
        // const { history } = this.props;

        return (
            <div className='view-wrapper'>
                <Map
                    className='new-map'
                    steps={steps}
                    onClickMap={this.handleClickMap}
                    onClickMarker={this.onClickItem}
                    userPosition={userPosition}
                    viewport={viewport}
                    changeViewport={this.changeViewport}
                />

                <div className='scroll-menu'>

                    <div className='circuit-title'>
                        <h3>{circuit.name}</h3>
                        <div className='circuit-buttons'>
                            <Tooltip
                                placement='right'
                                title='Editer les informations du circuit'
                            >
                                <Button
                                    onClick={this.displayUpdateCircuit}
                                    color='info'
                                ><Icon type='edit' />
                                </Button>
                            </Tooltip>
                            {(circuit.published !== true) &&
                                <Button
                                    className='update-circuit-button'
                                    onClick={this.publishCircuit}
                                    color='warning'
                                >Publier
                                </Button>
                            }
                        </div>
                    </div>

                    <DragDropContext
                        onDragEnd={this.dragEnd}
                    >
                        <StepList
                            items={steps}
                            onClickItem={this.onClickItem}
                            stepFocus={stepFocus}
                        />
                    </DragDropContext>

                </div>

                {/*
                <p
                    className='come-back-button'
                    onClick={() => history.goBack()}
                >Valider
                </p>
                */}


                <UpdateStepModal
                    step={stepFocus}
                    removeStep={this.removeStep}
                    updateStep={this.updateStep}
                    show={stepIsDisplayed}
                    displayUpdateStep={this.displayUpdateStep}
                    onChangePicturesList={this.onChangePicturesList}
                />

                <UpdateCircuitModal
                    onChangePicturesList={this.onChangePicturesList}
                    deleteCircuitPictures={this.deleteCircuitPictures}
                    uploadCircuitPictures={this.uploadCircuitPictures}
                    circuit={circuit}
                    show={circuitIsDisplayed}
                    displayUpdateCircuit={this.displayUpdateCircuit}
                    updateCircuit={this.updateCircuit}
                    img={img}
                />

            </div>
        );
    }

}
