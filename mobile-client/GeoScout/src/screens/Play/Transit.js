import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    AsyncStorage,
    Alert,
    StyleSheet,
    ScrollView,
    Dimensions
} from  'react-native';
import { Location, TaskManager } from 'expo';
import HTML from 'react-native-render-html';

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
            <View style={styles.container}>
                <Text style={styles.title}>Transit vers l'étape {step.order}</Text>
                <ScrollView style={{ flex: 1 }}>
                    <HTML html={step.instruction} imagesMaxWidth={Dimensions.get('window').width} />
                </ScrollView>

                {step.validation && 
                    <TouchableOpacity
                        onPress={() => navigate('Etape', { circuit, step: stepNumber })}
                        activeOpacity={0.8}
                        style={styles.button}
                    >
                        <Text style={styles.textButton}>Je suis arrivé</Text>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    title: {
        color: '#2c3e50',
        fontSize: 24,
        marginTop: 30,
        marginBottom: 15,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: '#2c3e50',
        borderRadius: 5,
        padding: 8,
        marginBottom: 5,
        width: '80%',
        alignItems: 'center'
    },
    textButton: {
        color: '#fff',
        fontSize: 18
    }
});