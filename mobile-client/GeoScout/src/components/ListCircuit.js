import React from 'react';
import {
    TouchableWithoutFeedback,
    ScrollView,
    View,
    Dimensions
} from 'react-native';
import api from '../config/httpMethods';
import Callout from './Callout';

const { height, width } = Dimensions.get('window');

export default class ListCircuit extends React.Component {
    state = {};
    componentDidMount() {
        const { root } = this.props;
        api.get(root)
            .then(circuits => {
                this.setState({ circuits });
                console.log(circuits);
            })
            .catch(error => {
                console.log(error);
                return null;
            });
    }

    render() {
        const { circuits } = this.state;
        const { navigate } = this.props;
        return (
            <ScrollView>
                {circuits &&
                    circuits.map(item => (
                        <TouchableWithoutFeedback
                            key={item.Circuit.id_circuit}
                            onPress={() => {
                                //navigate('DetailCircuit', item);
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
                                    name={item.Circuit.name}
                                    description={item.Circuit.description}
                                    distance={item.Circuit.length}
                                    // difficulty={[1, 0, 1]}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    ))}
            </ScrollView>
        );
    }
}
