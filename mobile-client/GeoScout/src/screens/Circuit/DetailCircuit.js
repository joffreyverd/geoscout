import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    Alert,
    ScrollView,
    Dimensions
} from 'react-native';
import { NavigationHeader, NavigationMenu} from '../../components/NavigationMenu';
import { SafeAreaView } from 'react-navigation';
import HTML from 'react-native-render-html';
import { Icon } from 'react-native-elements';

import api from '../../config/httpMethods';

export default class DetailCircuit extends React.Component {
    constructor(){
        super();
        this.state = {
            menuOpen: false
        };
    }

    render() {
        const { name, description, id_circuit } = this.props.navigation.state.params;
        const { menuOpen } = this.state;
        return (
            <NavigationMenu
            isOpen={menuOpen}
            toggle={menuOpen => this.setState({ menuOpen })}
            navigate={this.props.navigation.navigate}>
            <NavigationHeader
            pressMenu={() => this.setState({ menuOpen: true })}
            titleText={'Détail circuit'}
            pressHome={() => this.props.navigation.navigate('GeoLocation')}/>
                <SafeAreaView style={styles.container}>
                    <Text style={styles.title}>{name}</Text>
                    <ScrollView style={{ flex: 1 }}>
                        <HTML html={description} imagesMaxWidth={Dimensions.get('window').width} />
                    </ScrollView>
                    <TouchableOpacity style={styles.button}
                    onPress= {() => (
                        Alert.alert(
                            'Hopla',
                            'Jetzt geht\'s los',
                            [
                                {text: 'Retour', onPress: () => {this.props.navigation.navigate('Home');}, style: 'cancel'},
                                {text: 'Commencer à jouer', onPress: () => {
                                    api.get('download-circuit/'+ id_circuit).then((data) => {
                                        this.props.navigation.navigate('Start',{circuit: data});
                                    }).catch(() => {
                                        Alert.alert(
                                            'Erreur',
                                            'Une erreur est survenue, merci de réessayer.',
                                            [
                                                {text: 'Ok', onPress: () => {
                                                    this.props.navigation.navigate('Home');
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
                </SafeAreaView>
            </NavigationMenu>
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
