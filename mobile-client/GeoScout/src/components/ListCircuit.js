import React from 'react';
import { TouchableWithoutFeedback, ScrollView, View } from 'react-native';
import api from '../config/httpMethods';
import fileSystem from '../config/fileSystem';
import Callout from './Callout';

export default class ListCircuit extends React.Component {
    constructor() {
        super();
        this.state = {
            circuits: null,
            isReady: false
        };
    }

    async componentDidMount() {
        const { type, root } = this.props;
        try {
            if (type == 'local') {
                const circuits = await fileSystem.getCircuitsExist();
                if (
                    circuits != null &&
                    circuits != '' &&
                    circuits !== undefined
                ) {
                    this.setState({ circuits, isReady: true });
                }
            } else if (type == 'api') {
                const circuits = await api.get(root);
                this.setState({ circuits, isReady: true });
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { circuits, isReady } = this.state;
        const { navigate, format } = this.props;
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
                                navigate(
                                    'DetailCircuit',
                                    format ? item : item.Circuit
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
                                            : item.Circuit.distance
                                    }
                                    time={
                                        format
                                            ? item.duration
                                            : item.Circuit.time
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
