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

const DETECT_STEP = 'step-location-detection_task';

class Transit extends React.Component {
    state = {}
    componentDidMount() {
        const { circuit, step: stepNumber, score } = this.props.navigation.state.params;
        const step = circuit.Steps[stepNumber];
        if (step){
            if (step.validation) {
                Location.startGeofencingAsync(DETECT_STEP, [
                    {
                        latitude: step.latitude,
                        longitude: step.longitude,
                        radius: 50,
                        notifyOnEnter: true,
                        notifyOnExit: false
                    }
                ]);
                this.setState({ interval: setInterval(this.enterStepLocation, 1000) });
            }
        }
        else {
            this.props.navigation.navigate('Finish', { circuit, score });
        }
        
    }

    enterStepLocation = () => {
        // Vérification que l'utilisateur est arrivé par une variable dans l'AsyncStorage
        AsyncStorage.getItem(DETECTED).then((x) => {
            if (x === null)
                return;
            const { interval } = this.state;
            // Suppresion de la variable
            AsyncStorage.removeItem(DETECTED);
            // Arrêt de l'intervalle
            clearInterval(interval);

            const { 
                navigation: {
                    state: { 
                        params: {
                            step
                        }
                    }
                }
            } = this.props;

            Alert.alert(
                'Arrivé',
                step === 0 ? 'Vous êtes arrivé au point de départ' : `Vous êtes arrivé à l'étape ${step}`,
                [{ text: 'Valider', onPress: this.goToStep }],
                { cancelable: false }
            )
        })
    }

    /**
     * Fonction pour passer sur la vue de l'étape
     */
    goToStep = () => {
        const { 
            navigation: {
                navigate,
                state: { 
                    params: {
                        circuit,
                        step,
                        score
                    }
                }
            }
        } = this.props;
        navigate('Etape', { circuit, step, score });
    }

    componentWillUnmount() {
        const { interval } = this.state;
        if (interval)
            clearInterval(interval);
    }

    render() {
        const { 
            navigation: {
                state: { 
                    params: {
                        circuit,
                        step: stepNumber
                    }
                }
            }
        } = this.props;
        const step = circuit.Steps[stepNumber];
        if(step) {
            return (
                //<View style={styles.container}>
                <>
                    <View style={Object.assign({},styles.containerTransit, styles.container)}>
                        <Text 
                            style={styles.title}
                        >Transit vers {
                            step.order === 0 ?
                                'le point de départ'
                            :   `l'étape ${step.order} sur ${circuit.Steps.length - 1}`
                        }</Text>
                        <ScrollView style={{ flex: 1 }}>
                            {/* <HTML html={step.instruction} imagesMaxWidth={Dimensions.get('window').width} /> */}
                            <Text style={styles.description}>{step.instruction}</Text>
                        </ScrollView>
                    </View>
                    <View style={Object.assign({},styles.containerButton, styles.container)}>
                        { step.validation ?
                            <Text style={styles.description}>Détection automatique de votre position</Text>
                        :
                            <TouchableOpacity
                                onPress={this.goToStep}
                                activeOpacity={0.8}
                                style={styles.button}
                            >
                                <Text style={styles.textButton}>Je suis arrivé</Text>
                            </TouchableOpacity>  
                        }
                    </View>
                </>
                //</View>
            );
        } else {
            return null;
        }
    }
}

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
        backgroundColor: '#1abc9c',
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
        color: 'white',
        fontSize: 28,
        marginTop: 30,
        marginBottom: 30,
        fontWeight: 'bold'
    },
    description: {
        color: 'white',
        fontSize: 22
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