import React from 'react';
import { TouchableWithoutFeedback, ScrollView, View } from 'react-native';
import api from '../config/httpMethods';
import fileSystem from '../config/fileSystem';
import Callout from './Callout';

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
                }
            } else if (type == 'api') {
                const circuits = await api.get(root);
                this.setState({ circuits, isReady: true });
            } else if (type == 'achievedCircuit') {
                const achievedCircuit = await api.get('achievedcircuit');
                const downloadAchievedCircuit = achievedCircuit.map(
                    async item => {
                        const data = await fileSystem.readFile(
                            format ? item.id_circuit : item.Circuit.id_circuit
                        );
                        if (data.version != item.version) {
                            return null;
                        } else {
                            var orderStep = 0;
                            data.Steps.forEach(itemCircuit => {
                                if (item.id_step == itemCircuit.id_step) {
                                    orderStep = itemCircuit.order;
                                }
                            });
                            return {
                                id_circuit: data.id_circuit,
                                name: data.name,
                                description: data.description,
                                distance: data.distance,
                                duration: data.duration,
                                numberStep: data.Steps.length,
                                id_ac: item.id_achievement,
                                score: item.score,
                                maxScore: item.max_score,
                                time: item.time,
                                order: orderStep,
                                time: item.achievedTime
                            };
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

    navigateAchievedCircuit(circuit, id_ac, step, score, maxScore, time) {
        const { navigate } = this.props;
        navigate('Transit', {
            circuit,
            score,
            maxScore,
            startingTime: new Date(),
            time,
            step,
            id_ac
        });
    }

    render() {
        const { circuits, isReady } = this.state;
        const { navigate, format, type } = this.props;
        return (
            <ScrollView showsHorizontalScrollIndicator={false}>
                {isReady &&
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
                                          item,
                                          item.id_achievement,
                                          item.order,
                                          item.score,
                                          item.max_score,
                                          item.achievedTime
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
                                        format ? item.name : item.Circuit.name
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
                                                  maxOrderStep: item.numberStep
                                              }
                                            : null
                                    }
                                    // difficulty={[1, 0, 1]}
                                    callBy={'list'}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    ))}
            </ScrollView>
        );
    }
}
