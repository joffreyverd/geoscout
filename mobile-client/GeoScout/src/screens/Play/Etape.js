import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ScrollView
} from 'react-native';
import HTML from 'react-native-render-html';
import { AndroidBackHandler } from 'react-navigation-backhandler';
import Carousel from '../../components/Carousel';

import { PlayDrawerMenu, PlayHeader } from '../../components/PlayMenu';

class Etape extends React.Component {
    onBackPress = () => {
        this.refMenu.openDrawer();
        return true;
    };

    setRefMenu = ref => {
        this.refMenu = ref;
    };

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
                        maxScore,
                        startingTime,
                        time,
                        id_ac
                    }
                }
            }
        } = this.props;
        navigate('Transit', {
            circuit,
            step: stepNumber + 1,
            score: score + scoreWin,
            maxScore: maxScore + maxScoreWin,
            startingTime,
            time,
            id_ac
        });
    };

    passStep = () => {
        const {
            navigation: {
                state: {
                    params: { circuit, step: stepNumber }
                }
            }
        } = this.props;
        const step = circuit.Steps[stepNumber];
        this.nextStep(0, step.Questions.length * 5);
    };

    formatDifficulty = difficulty => {
        switch (difficulty) {
            case 1:
                return 'facile - 5pts';
            case 2:
                return 'intermédiaire - 10pts';
            case 3:
                return 'difficile - 15pts';
            default:
                return '';
        }
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
                        startingTime,
                        time,
                        id_ac
                    }
                }
            }
        } = this.props;
        const step = circuit.Steps[stepNumber];

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
                    startingTime={startingTime}
                    time={time}
                    id_achieved={id_ac}
                >
                    <PlayHeader
                        pressMenu={() => this.refMenu.openDrawer()}
                        title={
                            stepNumber === 0
                                ? 'Point de départ'
                                : `Etape ${stepNumber}`
                        }
                    />
                    <View
                        style={Object.assign(
                            {},
                            styles.containerStep,
                            styles.container
                        )}
                    >
                        <Text style={styles.title}>{step.name}</Text>
                        {step.images.length ? (
                            <Carousel images={step.images} />
                        ) : null}
                        <ScrollView style={{ flex: 1 }}>
                            {step.description ? (
                                <HTML
                                    html={step.description}
                                    imagesMaxWidth={
                                        Dimensions.get('window').width
                                    }
                                />
                            ) : null}
                        </ScrollView>
                    </View>
                    <View
                        style={Object.assign(
                            {},
                            styles.containerButton,
                            styles.container
                        )}
                    >
                        {step.Questions && step.Questions.length > 0 && (
                            <>
                                <Text style={styles.tip}>
                                    Répondez à une question
                                </Text>
                                {step.Questions.map(item => {
                                    if (!item.wording) return null;
                                    let screen = '';
                                    switch (item.type_of) {
                                        case 1:
                                            screen = 'QuestionQCM';
                                            break;
                                        case 2:
                                            screen = 'QuestionLibre';
                                            break;
                                    }
                                    return (
                                        <TouchableOpacity
                                            key={item.id_question}
                                            onPress={() => {
                                                navigate(screen, {
                                                    question: item,
                                                    nextStep: this.nextStep
                                                });
                                            }}
                                            activeOpacity={0.8}
                                            style={styles.button}
                                        >
                                            <Text style={styles.textButton}>
                                                Question{' '}
                                                {this.formatDifficulty(
                                                    item.difficulty
                                                )}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </>
                        )}

                        <TouchableOpacity
                            onPress={this.passStep}
                            activeOpacity={0.8}
                            style={[
                                styles.button,
                                {
                                    marginTop: 10,
                                    backgroundColor: '#e74c3c'
                                }
                            ]}
                        >
                            <Text style={styles.textButton}>
                                Passer cette étape
                            </Text>
                        </TouchableOpacity>
                    </View>
                </PlayDrawerMenu>
            </AndroidBackHandler>
        );
    }
}

export default Etape;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'center',
        padding: 15
    },
    containerStep: {
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
    tip: {
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
    noContent: {
        color: '#2c3e50',
        fontSize: 16,
        marginTop: 5,
        marginBottom: 10,
        textAlign: 'center'
    }
});
