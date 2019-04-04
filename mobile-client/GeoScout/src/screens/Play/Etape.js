import React from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from  'react-native';

class Etape extends React.Component {
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
                <Text>{step.name}</Text>
                <Text>{step.description}</Text>

                { step.questions.map((item) => 
                    <TouchableOpacity
                        key={item.id}
                        onPress={() => navigate('Question', { question: item })}
                    >
                        <Text>Question {item.difficulty}</Text>
                    </TouchableOpacity>
                )}
                
                <TouchableOpacity
                    onPress={() => navigate('Transit', { circuit, step: stepNumber + 1 })}
                >
                    <Text>Passer cette étape</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Etape;