import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ScrollView
} from  'react-native';
import HTML from 'react-native-render-html';

class Etape extends React.Component {
    /**
     * Navigue vers le transit de l'étape suivante
     */
    nextStep = () => {
        const { 
            navigation: {
                navigate,
                state: { 
                    params: {
                        circuit,
                        step: stepNumber
                    }
                }
            }
        } = this.props;
        navigate('Transit', { circuit, step: stepNumber + 1 })
    }

    render() {
        const { 
            navigation: {
                navigate,
                state: { 
                    params: {
                        circuit,
                        step: stepNumber
                    }
                }
            }
        } = this.props;
        const step = circuit.Steps[stepNumber];
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{step.name}</Text>
                <ScrollView style={{ flex: 1 }}>
                    <HTML html={step.description} imagesMaxWidth={Dimensions.get('window').width} />
                </ScrollView>

                { ( step.Questions && step.Questions.length > 0 ) &&
                    step.Questions.map((item) => 
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => navigate('Question', { question: item, nextStep: this.nextStep })}
                            activeOpacity={0.8}
                            style={styles.button}
                        >
                            <Text style={styles.textButton}>Question {item.difficulty}</Text>
                        </TouchableOpacity>
                )}
                
                <TouchableOpacity
                    onPress={this.nextStep}
                    activeOpacity={0.8}
                    style={styles.button}
                >
                    <Text style={styles.textButton}>Passer cette étape</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Etape;

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