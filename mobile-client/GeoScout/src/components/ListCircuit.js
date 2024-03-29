import React from 'react';
import { TouchableWithoutFeedback, ScrollView, View, Text } from 'react-native';
import api from '../config/httpMethods';
import fileSystem from '../config/fileSystem';
import Callout from './Callout';
import Loading from './Loading';

export default class ListCircuit extends React.Component {
    state = {
        circuits: [],
        achievedCircuit: [],
        orderStep: 0,
        isReady: false
    };

    async componentDidMount() {
        const { type, root, format } = this.props;
        try {
            if (type == 'local') {
                const circuits = await fileSystem.getCircuitsExist();
                if (circuits) {
                    this.setState({ circuits, isReady: true });
                } else {
                    this.setState({ isReady: true });
                }
            } else if (type == 'api') {
                const circuits = await api.get(root);
                this.setState({ circuits, isReady: true });
            } else if (type == 'achievedCircuit') {
                const achievedCircuit = await api.get(root);
                const downloadAchievedCircuit = achievedCircuit.map(
                    async item => {
                        const data = await fileSystem.readFile(
                            format ? item.id_circuit : item.Circuit.id_circuit
                        );
                        if (data && data.version == item.version) {
                            var orderStep = null;
                            let i = 0;
                            do {
                                if (item.id_step == data.Steps[i].id_step) {
                                    orderStep = data.Steps[i].order;
                                } else {
                                    i++;
                                }
                            } while (
                                orderStep == null &&
                                i < data.Steps.length
                            );
                            return {
                                Circuit: data,
                                numberStep: data.Steps.length,
                                id_ac: item.id_achievement,
                                score: item.score,
                                maxScore: item.max_score,
                                time: item.time,
                                order: orderStep,
                                time: item.achievedTime
                            };
                        } else {
                            return null;
                        }
                    }
                );
                const result = await Promise.all(downloadAchievedCircuit);
                this.setState({
                    circuits: result,
                    achievedCircuit,
                    isReady: true
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    navigateAchievedCircuit(circuit, id_ac, stepNumber, score, maxScore, time) {
        const { navigate } = this.props;
        navigate('Transit', {
            circuit,
            score,
            maxScore,
            startingTime: new Date(),
            time,
            step: stepNumber,
            id_ac
        });
    }

    render() {
        const { circuits, isReady } = this.state;
        const { navigate, format, type } = this.props;
        return (
            <ScrollView showsHorizontalScrollIndicator={false}>
                {isReady ? (
                    circuits.length > 0 ? (
                        circuits.map(item => (
                            <TouchableWithoutFeedback
                                key={
                                    format
                                        ? item.id_circuit
                                        : item.Circuit.id_circuit
                                }
                                onPress={() => {
                                    type != 'achievedCircuit'
                                        ? navigate('DetailCircuit', {
                                              id_circuit: format
                                                  ? item.id_circuit
                                                  : item.Circuit.id_circuit
                                          })
                                        : this.navigateAchievedCircuit(
                                              item.Circuit,
                                              item.id_ac,
                                              item.order,
                                              item.score,
                                              item.maxScore,
                                              item.time
                                          );
                                }}
                            >
                                <View>
                                    <Callout
                                        styleCallout={{
                                            flexDirection: 'column',
                                            alignSelf: 'flex-start',
                                            width: '100%',
                                            padding: 10,
                                            backgroundColor: '#fff',
                                            marginBottom: 10,
                                            borderRadius: 5
                                        }}
                                        name={
                                            format
                                                ? item.name
                                                : item.Circuit.name
                                        }
                                        description={
                                            format
                                                ? item.description
                                                : item.Circuit.description
                                        }
                                        distance={
                                            format
                                                ? item.length
                                                : item.Circuit.length
                                        }
                                        time={
                                            format
                                                ? item.real_duration
                                                : item.Circuit.real_duration
                                        }
                                        order={
                                            type == 'achievedCircuit'
                                                ? {
                                                      orderStep: item.order,
                                                      maxOrderStep:
                                                          item.numberStep
                                                  }
                                                : null
                                        }
                                        // difficulty={[1, 0, 1]}
                                        callBy={'list'}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                        ))
                    ) : (
                        <Text
                            style={{
                                fontSize: 18,
                                color: '#2c3e50',
                                textAlign: 'center',
                                marginTop: 10
                            }}
                        >
                            Pas de circuit disponible.
                        </Text>
                    )
                ) : (
                    <Loading />
                )}
            </ScrollView>
        );
    }
}
