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
import { Location, TaskManager } from 'expo';
import { AndroidBackHandler } from 'react-navigation-backhandler';
//import HTML from 'react-native-render-html';

import { PlayDrawerMenu, PlayHeader } from '../../components/PlayMenu';

// Nom de la variable dans AsyncStorage
const DETECTED = 'stepDetected';

const DETECT_STEP = 'step-location-detection_task';

class Transit extends React.Component {
    state = {};

    componentDidMount() {
        const {
            circuit,
            step: stepNumber,
            score,
            maxScore,
            startingTime,
            time
        } = this.props.navigation.state.params;
        const step = circuit.Steps[stepNumber];
        if (step) {
            if (step.validation) {
                console.log('searching geoloc');
                Location.startGeofencingAsync(DETECT_STEP, [
                    {
                        latitude: step.latitude,
                        longitude: step.longitude,
                        radius: 50,
                        notifyOnEnter: true,
                        notifyOnExit: false
                    }
                ]);
                this.setState({
                    interval: setInterval(this.enterStepLocation, 1000)
                });
            }
        } else {
            let finishTime = time + (new Date() - startingTime) / (1000 * 60);
            this.props.navigation.navigate('Finish', {
                circuit,
                score,
                maxScore,
                time: finishTime
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

    enterStepLocation = () => {
        // Vérification que l'utilisateur est arrivé par une variable dans l'AsyncStorage
        AsyncStorage.getItem(DETECTED).then(x => {
            if (x === null) return;
            const { interval } = this.state;
            // Suppresion de la variable
            AsyncStorage.removeItem(DETECTED);
            // Arrêt de l'intervalle
            clearInterval(interval);
            Location.stopGeofencingAsync(DETECT_STEP);

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
        });
    };

    /**
     * Fonction pour passer sur la vue de l'étape
     */
    goToStep = e => {
        if (e) e.preventDefault();
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
                        time
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
            time
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
                        startingTime
                    }
                }
            }
        } = this.props;
        const step = circuit.Steps[stepNumber];

        if (step) {
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
                    >
                        <PlayHeader
                            pressMenu={() => this.refMenu.openDrawer()}
                        />
                        <View
                            style={Object.assign(
                                {},
                                styles.containerTransit,
                                styles.container
                            )}
                        >
                            <Text style={styles.title}>
                                Transit vers{' '}
                                {step.order === 0
                                    ? 'le point de départ'
                                    : `l'étape ${step.order} sur ${circuit.Steps
                                          .length - 1}`}
                            </Text>
                            <ScrollView style={{ flex: 1 }}>
                                {/* <HTML html={step.instruction} imagesMaxWidth={Dimensions.get('window').width} /> */}
                                <Text style={styles.description}>
                                    {step.instruction}
                                </Text>
                            </ScrollView>
                        </View>
                        <View
                            style={Object.assign(
                                {},
                                styles.containerButton,
                                styles.container
                            )}
                        >
                            {step.validation ? (
                                <>
                                    <Text
                                        style={Object.assign(
                                            {},
                                            styles.description,
                                            styles.detection
                                        )}
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

TaskManager.defineTask(
    DETECT_STEP,
    ({ data: { eventType, region }, error }) => {
        if (error) {
            console.log(error);
            return;
        }
        if (eventType === Location.GeofencingEventType.Enter) {
            console.log('Arrivé');
            AsyncStorage.setItem(DETECTED, 'true').then(() => {
                // Notifier l'utilisateur (Vibration ?)
            });
        }
    }
);

export default Transit;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'center',
        padding: 20
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
        fontSize: 28,
        marginTop: 30,
        marginBottom: 30,
        fontWeight: 'bold'
    },
    description: {
        color: 'black',
        fontSize: 22
    },
    detection: {
        textAlign: 'center'
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
        fontSize: 22
    }
});
