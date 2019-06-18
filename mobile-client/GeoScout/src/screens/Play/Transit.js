import React from 'react';
import {
    Text,
    TouchableOpacity,
    AsyncStorage,
    Alert,
    StyleSheet,
    ScrollView,
    View
    //Dimensions
} from 'react-native';
import { AndroidBackHandler } from 'react-navigation-backhandler';

import { PlayDrawerMenu, PlayHeader } from '../../components/PlayMenu';
import {
    DETECTED,
    startLocationTask,
    stopLocationTask
} from '../../config/LocationTask';

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
                startLocationTask(step);
                this.setState({
                    interval: setInterval(this.hasEnteredStepLocation, 1000)
                });
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
        const { interval } = this.state;
        if (interval) clearInterval(interval);
    }

    onBackPress = () => {
        this.refMenu.openDrawer();
        return true;
    };

    setRefMenu = ref => {
        this.refMenu = ref;
    };

    hasEnteredStepLocation = async () => {
        // Vérification que l'utilisateur est arrivé par une variable dans l'AsyncStorage
        const x = await AsyncStorage.getItem(DETECTED);
        if (x === null) return;

        const { interval } = this.state;
        // Suppression de la variable
        AsyncStorage.removeItem(DETECTED);
        // Arrêt de l'intervalle
        clearInterval(interval);
        stopLocationTask();

        this.arrived();
    };

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
        stopLocationTask();
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
        console.log(this.props);
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
                            <ScrollView style={{ flex: 1 }}>
                                {step.description ? (
                                    <Text style={styles.description}>
                                        {step.instruction}
                                    </Text>
                                ) : null}
                            </ScrollView>
                        </View>
                        <View
                            style={[styles.containerButton, styles.container]}
                        >
                            {step.validation ? (
                                <>
                                    <Text
                                        style={[
                                            styles.description,
                                            styles.detection
                                        ]}
                                    >
                                        Détection automatique de votre position
                                    </Text>
                                    <TouchableOpacity
                                        onPress={this.goToStep}
                                        activeOpacity={0.8}
                                        style={styles.button}
                                    >
                                        <Text style={styles.textButton}>
                                            Je suis arrivé
                                        </Text>
                                    </TouchableOpacity>
                                </>
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
    }
});
