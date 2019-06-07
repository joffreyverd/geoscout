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
    constructor() {
        super();
        this.state = {
            circuits: null,
            isReady: false
        };
    }
    componentDidMount() {
        const { type, root } = this.props;
        if (type == 'local') {
            console.log('local');
            circuitsJSON = fileSystem.getCircuitsExist();
            console.log(circuitsJSON);
            if (circuitsJSON != null || circuitsJSON != '')
                this.setState({ circuits: circuitsJSON, isReady: true });
        } else {
            console.log('api');
            api.get(root)
                .then(circuits => {
                    this.setState({ circuits: circuits, isReady: true });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    render() {
        const { circuits, isReady } = this.state;
        const { navigate } = this.props;
        return (
            <ScrollView>
                {isReady &&
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
