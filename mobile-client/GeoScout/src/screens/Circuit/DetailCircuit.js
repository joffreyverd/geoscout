import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    Alert,
    ScrollView,
    Dimensions,
    ToastAndroid
} from 'react-native';
import {
    NavigationHeader,
    NavigationMenu
} from '../../components/NavigationMenu';
import { SafeAreaView } from 'react-navigation';
import HTML from 'react-native-render-html';

import api from '../../config/httpMethods';
import fileSystem from '../../config/fileSystem';

export default class DetailCircuit extends React.Component {
    constructor() {
        super();
        this.state = {
            menuOpen: false
        };
    }

    download = () => {
        const {
            navigate,
            state: {
                params: { id_circuit }
            }
        } = this.props.navigation;
        api.get('download-circuit/' + id_circuit)
            .then(data => {
                // fileSystem.writeFile(id_circuit, data);
                data.Steps.sort((a, b) => a.order - b.order);
                Alert.alert(
                    'Hopla',
                    "Jetzt geht's los",
                    [
                        {
                            text: 'Retour',
                            onPress: () => {
                                navigate('Home');
                            },
                            style: 'cancel'
                        },
                        {
                            text: 'Commencer à jouer',
                            onPress: () => {
                                navigate('Start', {
                                    circuit: data
                                });
                            }
                        }
                    ],
                    { cancelable: false }
                );
            })
            .catch(() => {
                Alert.alert(
                    'Erreur',
                    'Une erreur est survenue, merci de réessayer.',
                    [
                        {
                            text: 'Ok',
                            onPress: () => {
                                navigate('Home');
                            },
                            style: 'cancel'
                        }
                    ],
                    { cancelable: false }
                );
            });
    };

    render() {
        const {
            name,
            description,
            id_circuit
        } = this.props.navigation.state.params;
        const { menuOpen } = this.state;
        return (
            <NavigationMenu
                isOpen={menuOpen}
                toggle={menuOpen =>
                    this.setState({
                        menuOpen
                    })
                }
                navigate={this.props.navigation.navigate}
            >
                <NavigationHeader
                    pressMenu={() =>
                        this.setState({
                            menuOpen: true
                        })
                    }
                    titleText={'Détail circuit'}
                    pressHome={() =>
                        this.props.navigation.navigate('GeoLocation')
                    }
                />
                <SafeAreaView style={styles.container}>
                    <Text style={styles.title}> {name} </Text>
                    <ScrollView
                        style={{
                            flex: 1
                        }}
                    >
                        <HTML
                            html={description}
                            imagesMaxWidth={Dimensions.get('window').width}
                        />
                    </ScrollView>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            api.put('favorites/' + id_circuit)
                                .then(() =>
                                    ToastAndroid.show(
                                        'Circuit Ajouté à vos favoris',
                                        ToastAndroid.SHORT
                                    )
                                )
                                .catch(() =>
                                    ToastAndroid.show(
                                        'Circuit déjà présent dans vos favoris',
                                        ToastAndroid.SHORT
                                    )
                                );
                        }}
                    >
                        <Text style={styles.textButton}>
                            Ajouter au favoris
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.download}
                    >
                        <Text style={styles.textButton}>Télécharger </Text>
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
        padding: 15,
        paddingBottom: 25
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
