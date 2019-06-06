import React from 'react';
import {
    TouchableWithoutFeedback,
    ScrollView,
    View,
    Dimensions
} from 'react-native';
import api from '../config/httpMethods';
import fileSystem from '../config/fileSystem';
import Callout from './Callout';

const { height, width } = Dimensions.get('window');

export default class ListCircuit extends React.Component {
    state = {};
    componentDidMount() {
        const { type, root } = this.props;
        if (type == 'local') {
            console.log('local');
            circuitsJSON = fileSystem.getCircuitsExist();
            this.setState({ circuits: circuitsJSON });
        } else {
            console.log('api');
            api.get(root)
                .then(circuits => {
                    this.setState({ circuits });
                })
                .catch(() => {
                    return null;
                });
        }
        console.log(this.state.circuits);
    }

    render() {
        const { circuits } = this.state;
        const { navigate } = this.props;
        return (
            <ScrollView>
                {circuits &&
                    circuits.map(item => (
                        <TouchableWithoutFeedback
                            key={item.id_circuit}
                            onPress={() => {
                                navigate('DetailCircuit', item);
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
                                    name={item.name}
                                    description={item.description}
                                    distance={item.length}
                                    time={item.duration}
                                    // difficulty={[1, 0, 1]}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    ))}
            </ScrollView>
        );
    }
}
