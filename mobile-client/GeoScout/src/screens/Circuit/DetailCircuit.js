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
import { NavigationHeader } from '../../components/NavigationDrawer';
import { SafeAreaView } from 'react-navigation';
import HTML from 'react-native-render-html';
import { Icon } from 'react-native-elements';

import api from '../../config/httpMethods';
import fileSystem from '../../config/fileSystem';

export default class DetailCircuit extends React.Component {
    constructor() {
        super();
        this.state = {
            isDownload: null
        };
    }

    componentDidMount() {
        fileSystem.deleteFile(37);
        const {
            state: {
                params: { id_circuit }
            }
        } = this.props.navigation;
        fileSystem.checkCircuitExist(id_circuit).then(isDownload => {
            this.setState({ isDownload: isDownload });
        });
    }

    alertUser(playOrDownload) {
        const {
            navigate,
            state: {
                params: { id_circuit }
            }
        } = this.props.navigation;
        Alert.alert(
            playOrDownload ? 'Hopla' : 'Télécharger',
            playOrDownload
                ? "Jetzt geht's los"
                : 'Voulez vous vraiment télécharger ce circuit ?',
            [
                {
                    text: 'Retour',
                    onPress: () => {
                        navigate('Home');
                    },
                    style: 'cancel'
                },
                {
                    text: playOrDownload ? 'Jouer' : 'Oui',
                    onPress: async () => {
                        if (playOrDownload) {
                            navigate('Transit', {
                                circuit: await fileSystem.readFile(id_circuit),
                                step: 0,
                                score: 0,
                                maxScore: 0,
                                time: 0
                            });
                        } else {
                            this.download();
                        }
                    }
                }
            ],
            { cancelable: false }
        );
    }

    download = () => {
        const {
            navigate,
            state: {
                params: { id_circuit }
            }
        } = this.props.navigation;
        api.get('download-circuit/' + id_circuit)
            .then(async data => {
                data.Steps.sort((a, b) => a.order - b.order);
                await fileSystem.writeFile(id_circuit, data);
                Alert.alert(
                    'Circuit télécharger !',
                    "Partons à l'aventure ?",
                    [
                        {
                            text: 'Non',
                            onPress: () => {
                                navigate('Home');
                            },
                            style: 'cancel'
                        },
                        {
                            text: 'Oui',
                            onPress: () => {
                                navigate('Transit', {
                                    circuit: data,
                                    step: 0,
                                    score: 0,
                                    maxScore: 0,
                                    time: 0
                                });
                            }
                        }
                    ],
                    { cancelable: true }
                );
            })
            .catch(() => {
                Alert.alert(
                    'Oh mince...',
                    'Une erreur est survenue, merci de réessayer et de vérifier votre connexion internet.',
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
        const { isDownload } = this.state;
        return (
            <>
                <NavigationHeader
                    pressMenu={this.props.navigation.openDrawer}
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
                        onPress={() => this.alertUser(isDownload)}
                    >
                        {isDownload ? (
                            <>
                                <Icon name="play-circle-filled" color="white" />
                                <Text style={styles.textButton}>Jouer</Text>
                            </>
                        ) : (
                            <>
                                <Icon name="get-app" color="white" />
                                <Text style={styles.textButton}>
                                    Télécharger
                                </Text>
                            </>
                        )}
                    </TouchableOpacity>
                </SafeAreaView>
            </>
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
        justifyContent: 'center',
        alignItems: 'baseline',
        flexDirection: 'row'
    },
    textButton: {
        color: '#fff',
        fontSize: 18
    }
});
