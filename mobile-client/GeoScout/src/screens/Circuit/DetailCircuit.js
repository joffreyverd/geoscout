import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
    Alert
} from 'react-native';


export default class DetailCircuit extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.props.item.name}</Text>
                <Text style={styles.description}>{this.props.item.descritption}</Text>
                <TouchableOpacity style={styles.button}
                onPress= {() => (
                    Alert.alert(
                        'Circuit Téléchargé',
                        [
                            {text: 'Not today', onPress: () => console.log('Not today pressed'), style: 'cancel'},
                            {text: 'Let\'s Go !', onPress: () => console.log('Let\'s Go pressed')},
                        ],
                        { cancelable: false }
                    )
                )}>
                    <Text style={styles.textButton}>
                        Télécharger
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1abc9c'
    },
    title: {
        color: '#8e44ad',
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: 26        
    },
    description: {
        color: '#8e44ad',
        textAlign: 'left',
        fontSize: 18
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
    }
});
