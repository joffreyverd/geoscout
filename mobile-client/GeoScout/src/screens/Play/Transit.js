import React from 'react';
import * as Location from 'expo-location';
import {
    Text,
    TouchableOpacity,
    // AsyncStorage,
    Alert,
    StyleSheet,
    ScrollView,
    View
} from 'react-native';
import { AndroidBackHandler } from 'react-navigation-backhandler';
import { isPointWithinRadius } from 'geolib';
import Compass from '../../components/Compass';

import { PlayDrawerMenu, PlayHeader } from '../../components/PlayMenu';
// import {
//     DETECTED,
//     startLocationTask,
//     stopLocationTask
// } from '../../config/LocationTask';

class Transit extends React.Component {
    state = {};

    componentDidMount() {
        const {
            circuit,
            step: stepNumber,
            score,
            maxScore,
            startingTime,
            time,
            id_ac
        } = this.props.navigation.state.params;
        // Récupération de l'étape en cours
        const step = circuit.Steps[stepNumber];

        if (step) {
            if (step.validation) {
                // NOT IMPLEMENTED : détection en background de la position
                // startLocationTask(step);
                // this.setState({
                //     interval: setInterval(this.hasEnteredStepLocation, 1000)
                // });

                Location.watchPositionAsync(
                    {
                        accuracy: Location.Accuracy.BestForNavigation,
                        timeInterval: 500
                    },
                    location => this.testIsArrived(location, step)
                ).then(subscription => this.setState({ subscription }));
            }
        } else {
            const {
                navigation: { navigate }
            } = this.props;
            let finishTime = time + (new Date() - startingTime) / (1000 * 60);
            navigate('Finish', {
                circuit,
                score,
                maxScore,
                time: finishTime,
                id_ac
            });
        }
    }

    componentWillUnmount() {
        // const { interval } = this.state;
        // if (interval) clearInterval(interval);
        const { subscription } = this.state;
        if (subscription) subscription.remove();
    }

    onBackPress = () => {
        this.refMenu.openDrawer();
        return true;
    };

    setRefMenu = ref => {
        this.refMenu = ref;
    };

    testIsArrived = (location, step) => {
        if (step.compass) this.setState({ location });
        if (isPointWithinRadius(location.coords, step, 20)) {
            const { subscription } = this.state;
            subscription.remove();
            this.arrived();
        }
    };

    /**
     * NOT IMPLEMENTED
     * Fonction de vérification pour la détection en background
     */
    // hasEnteredStepLocation = async () => {
    //     // Vérification que l'utilisateur est arrivé par une variable dans l'AsyncStorage
    //     const x = await AsyncStorage.getItem(DETECTED);
    //     if (x === null) return;

    //     const { interval } = this.state;
    //     // Suppression de la variable
    //     AsyncStorage.removeItem(DETECTED);
    //     // Arrêt de l'intervalle
    //     clearInterval(interval);
    //     stopLocationTask();

    //     this.arrived();
    // };

    arrived = () => {
        const {
            navigation: {
                state: {
                    params: { step }
                }
            }
        } = this.props;

        Alert.alert(
            'Arrivé',
            step === 0
                ? 'Vous êtes arrivé au point de départ'
                : `Vous êtes arrivé à l'étape ${step}`,
            [{ text: 'Valider', onPress: this.goToStep }],
            { cancelable: false }
        );
    };

    /**
     * Fonction pour passer sur la vue de l'étape
     */
    goToStep = e => {
        if (e) e.preventDefault();
        //stopLocationTask();
        let {
            navigation: {
                navigate,
                state: {
                    params: {
                        circuit,
                        step,
                        score,
                        maxScore,
                        startingTime,
                        time,
                        id_ac
                    }
                }
            }
        } = this.props;
        if (step === 0) {
            startingTime = new Date();
        }
        navigate('Etape', {
            circuit,
            step,
            score,
            maxScore,
            startingTime,
            time,
            id_ac
        });
    };

    render() {
        const {
            navigation: {
                navigate,
                state: {
                    params: {
                        circuit,
                        step: stepNumber,
                        score,
                        maxScore,
                        time,
                        startingTime,
                        id_ac
                    }
                }
            }
        } = this.props;
        const { location } = this.state;
        // Récupération de l'étape
        const step = circuit.Steps[stepNumber];
        if (step) {
            const title =
                'Transit ' +
                (step.order === 0
                    ? 'initial'
                    : `${step.order} / ${circuit.Steps.length - 1}`);

            return (
                <AndroidBackHandler onBackPress={this.onBackPress}>
                    <PlayDrawerMenu
                        setRefMenu={this.setRefMenu}
                        navigate={navigate}
                        circuit={{
                            id_circuit: circuit.id_circuit,
                            id_step: step.id_step,
                            version: circuit.version
                        }}
                        score={score}
                        maxScore={maxScore}
                        time={time || 0}
                        startingTime={startingTime}
                        id_achieved={id_ac}
                    >
                        <PlayHeader
                            pressMenu={() => this.refMenu.openDrawer()}
                            title={title}
                        />
                        <View
                            style={[styles.containerTransit, styles.container]}
                        >
                            <Text style={styles.title}>
                                Vers
                                {step.order === 0
                                    ? ' le point de départ'
                                    : ` l'étape ${step.order}`}
                            </Text>
                            {step.compass ? (
                                location ? (
                                    <>
                                        <Compass
                                            step={step}
                                            userPosition={location}
                                        />
                                        <Text style={styles.infoCompass}>
                                            Pour le calibrage de la boussole, il
                                            est nécessaire de marcher quelques
                                            pas.
                                        </Text>
                                    </>
                                ) : null
                            ) : (
                                <ScrollView style={{ flex: 1 }}>
                                    {step.description ? (
                                        <Text style={styles.description}>
                                            {step.instruction}
                                        </Text>
                                    ) : null}
                                </ScrollView>
                            )}
                        </View>
                        <View
                            style={[styles.containerButton, styles.container]}
                        >
                            {step.validation ? (
                                <Text
                                    style={[
                                        styles.description,
                                        styles.detection
                                    ]}
                                >
                                    Détection automatique de votre position
                                </Text>
                            ) : (
                                <TouchableOpacity
                                    onPress={this.goToStep}
                                    activeOpacity={0.8}
                                    style={styles.button}
                                >
                                    <Text style={styles.textButton}>
                                        Je suis arrivé
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </PlayDrawerMenu>
                </AndroidBackHandler>
            );
        } else {
            return null;
        }
    }
}

export default Transit;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'center',
        padding: 15
    },
    containerTransit: {
        flex: 1
    },
    containerButton: {
        alignItems: 'center'
    },
    title: {
        textAlign: 'center',
        color: '#1abc9c',
        fontSize: 24,
        marginTop: 20,
        marginBottom: 30,
        fontWeight: 'bold'
    },
    description: {
        color: 'black',
        fontSize: 22
    },
    detection: {
        textAlign: 'center',
        color: '#1abc9c',
        fontSize: 18,
        marginBottom: 10
    },
    button: {
        backgroundColor: '#2c3e50',
        borderRadius: 5,
        padding: 8,
        marginBottom: 5,
        width: '90%',
        alignItems: 'center'
    },
    textButton: {
        color: '#fff',
        fontSize: 18
    },
    infoCompass: {
        fontSize: 10,
        color: '#2c3e50',
        textAlign: 'center'
    }
});
