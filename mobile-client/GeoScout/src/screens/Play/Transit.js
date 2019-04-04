import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    AsyncStorage,
    Alert
} from  'react-native';
import { Location, TaskManager } from 'expo';

// Nom de la variable dans AsyncStorage 
const DETECTED = 'stepDetected';

class Transit extends React.Component {

    componentDidMount() {
        const { circuit, step: stepNumber } = this.props.navigation.params.state;
        const step = circuit.Steps[stepNumber];

        if (step.validation) {
            Location.startGeofencingAsync(DETECT_STEP, [
                {
                    latitude: step.latitude,
                    longitude: step.longitude,
                    radius: 30,
                    notifyOnEnter: true,
                    notifyOnExit: false
                }
            ]);
            this.setState({ interval: setInterval(this.enterStepLocation, 1000) });
        }
    }

    enterStepLocation = () => {$
        // Vérification que l'utilisateur est arrivé par une variable dans l'AsyncStorage
        AsyncStorage.getItem(DETECTED).then((x) => {
            console.log(x);
            const { interval } = this.state;
            // Suppresion de la variable
            AsyncStorage.removeItem(DETECTED);
            // Arrêt de l'intervalle
            clearInterval(interval);

            const { 
                navigation: {
                    navigate,
                    params: { 
                        state: {
                            circuit,
                            step
                        }
                    }
                }
            } = this.props;
            Alert.alert(
                'Arrivé',
                step === 0 ? 'Vous êtes arrivé au point de départ' : `Vous êtes arrivé à l'étape ${step}`,
                [{ text: 'Valider', onPress: () => { navigate('Step', { circuit, step }) } }],
                { cancelable: false }
            )
        })
    }

    componentWillUnmount() {
        const { interval } = this.state;
        if (interval)
            clearInterval(interval);
    }

    render() {
        const { 
            navigation: {
                navigate,
                params: { 
                    state: {
                        circuit,
                        step: stepNumber
                    }
                }
            }
        } = this.props;
        const step = circuit.Steps[stepNumber];

        return (
            <View>
                <Text>Transit vers l'étape {step.order}</Text>
                <Text>{step.instruction}</Text>

                {step.validation && 
                    <TouchableOpacity
                        onPress={() => navigate('Etape', { circuit, step: stepNumber })}
                    >
                        <Text>Je suis arrivé</Text>
                    </TouchableOpacity>
                }
            </View>
        );
    }
}
const DETECT_STEP = 'step-location-detection_task';

TaskManager.defineTask(DETECT_STEP, ({ data: { eventType, region }, error }) => {
    if (error) {
        console.log(error);
        return;
    }
    if (eventType === Location.GeofencingEventType.Enter) {
        console.log("Arrivé");
        AsyncStorage.setItem(DETECTED, 'true').then(() => {
            // Notifier l'utilisateur (Vibration ?)
        })
    }
})

export default Transit;