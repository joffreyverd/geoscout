import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
    Alert,
    ScrollView,
    Dimensions
} from 'react-native';
import HTML from 'react-native-render-html';

import api from '../../config/httpMethods';

export default class DetailCircuit extends React.Component {
    render() {
        const { name, description, id_circuit } = this.props.navigation.state.params;
        return (
            <View style={styles.container}>
            {console.log(this.props.navigation.state.params)}
                <Text style={styles.title}>{name}</Text>
                <ScrollView style={{ flex: 1 }}>
                    <HTML html={description} imagesMaxWidth={Dimensions.get('window').width} />
                </ScrollView>
                <TouchableOpacity style={styles.button}
                onPress= {() => (
                    Alert.alert(
                        'Circuit Télécharger',
                        'Votre circuit a été télécharger.',
                        [
                            {text: 'Retour', onPress: () => {this.props.navigation.navigate('Home')}, style: 'cancel'},
                            {text: 'Commencer à jouer', onPress: () => {
                                api.get('download-circuit/'+ id_circuit).then((data) => {
                                    this.props.navigation.navigate('Start',{circuit: data});
                                }).catch((error) => {
                                    Alert.alert(
                                        'Erreur',
                                        'Une erreur est survenue, merci de réesayé.',
                                        [
                                            {text: 'Ok', onPress: () => {
                                                this.props.navigation.navigate('Home');
                                                console.log(error);
                                            }, style: 'cancel'}
                                        ],
                                        { cancelable: false }
                                    )
                                });
                                
                            }},
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
        backgroundColor: 'white',
        marginRight: 10,
        marginLeft: 10,
        marginTop: 25
    },
    title: {
        color: '#1abc9c',
        fontWeight: 'bold',
        fontSize: 26        
    },
    description: {
        color: '#007E65',
        textAlign: 'left',
        fontSize: 18
    },
    buttonWrapper: {
        width: '100%',
        flex: 1,
        position: 'absolute',
        bottom: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#2c3e50',
        borderRadius: 5,
        padding: 8,
        marginBottom: 5,
        width: '100%',
        alignItems: 'center'
    },
    textButton: {
        color: '#fff',
        fontSize: 18
    }
});