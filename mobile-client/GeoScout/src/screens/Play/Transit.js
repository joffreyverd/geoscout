import React from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from  'react-native';
import { Location, TaskManager } from 'expo';

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
            ])
        }
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
    }
})

export default Transit;