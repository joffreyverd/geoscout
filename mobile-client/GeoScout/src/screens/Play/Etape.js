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
    nextStep = (scoreWin, maxScoreWin) => {
        const { 
            navigation: {
                navigate,
                state: { 
                    params: {
                        circuit,
                        step: stepNumber,
                        score,
                        maxScore
                    }
                }
            }
        } = this.props;
        navigate('Transit', { 
            circuit,
            step: stepNumber + 1,
            score: score + scoreWin,
            maxScore: maxScore + maxScoreWin
        });
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
            <>
                <View style={Object.assign({},styles.containerStep,styles.container)}>
                    <Text style={styles.title}>{step.name}</Text>
                    <ScrollView style={{ flex: 1, color: 'white' }}>
                        <HTML html={step.description} imagesMaxWidth={Dimensions.get('window').width} />
                    </ScrollView>
                </View>
                <View style={Object.assign({},styles.containerButton,styles.container)}>
                    { ( step.Questions && step.Questions.length > 0 ) &&
                        step.Questions.map((item) => 
                            <TouchableOpacity
                                key={item.id_question}
                                onPress={() => navigate('Question', { question: item, nextStep: this.nextStep })}
                                activeOpacity={0.8}
                                style={styles.button}
                            >
                                <Text style={styles.textButton}>Question {item.difficulty}</Text>
                            </TouchableOpacity>
                    )}
                    
                    <TouchableOpacity
                        onPress={() => this.nextStep(0, 15)}
                        activeOpacity={0.8}
                        style={styles.button}
                    >
                        <Text style={styles.textButton}>Passer cette étape</Text>
                    </TouchableOpacity>
                </View>
            </>
        )
    }
}

export default Etape;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1abc9c',
        justifyContent: 'center',
        padding: 20
    },  
    containerStep: {
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