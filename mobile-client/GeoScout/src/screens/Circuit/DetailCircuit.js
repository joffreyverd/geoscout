import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    Alert,
    View,
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
import ListComment from '../../components/ListComment';
import Carousel from '../../components/Carousel';
import evaluations from '../../../utils/json/evaluations.json';

export default class DetailCircuit extends React.Component {
    constructor() {
        super();
        this.state = {
            isDownload: false,
            evaluations: evaluations,
            images: []
        };
    }

    async componentDidMount() {
        const { id_circuit } = this.props.navigation.state.params;
        try {
            const isDownload = await fileSystem.checkCircuitExist(id_circuit);
            const images = await api.post('download', {
                id: id_circuit,
                type: 'circuit'
            });
            // const evaluations = await api.get(`evaluation/${id_circuit}`)
            // this.setState({evaluations});
            this.setState({ isDownload, images });
        } catch (error) {
            console.log('error try/catch detailCircuit');
            console.log(error);
        }
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
                            fileSystem.readFile(id_circuit).then(data => {
                                navigate('Transit', {
                                    circuit: data,
                                    step: 0,
                                    score: 0,
                                    maxScore: 0,
                                    time: 0
                                });
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
            .then(data => {
                data.Steps.sort((a, b) => a.order - b.order);
                fileSystem.writeFile(id_circuit, data);
                Alert.alert(
                    'Circuit téléchargé !',
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
        const { isDownload, evaluations, images } = this.state;
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
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        style={{
                            flex: 1
                        }}
                    >
                        <Text style={styles.title}>{name}</Text>
                        <Carousel images={images} />
                        {description !== undefined &&
                        description != null &&
                        description != '' ? (
                            <HTML
                                html={description.replace(/<p><br><\/p>/g, '')}
                                imagesMaxWidth={Dimensions.get('window').width}
                            />
                        ) : (
                            <Text style={styles.description}>
                                Pas de description disponible sur ce circuit.
                            </Text>
                        )}
                        {evaluations && evaluations.length && (
                            <>
                                <Text style={styles.commentSection}>
                                    Commentaires :
                                </Text>
                                <ListComment evaluations={evaluations} />
                            </>
                        )}
                    </ScrollView>
                    <View style={styles.buttonWrapper}>
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
                                    <Icon
                                        name="play-circle-filled"
                                        color="white"
                                    />
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
                    </View>
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
        paddingTop: 5,
        paddingBottom: 0
    },
    title: {
        textAlign: 'center',
        color: '#1abc9c',
        fontWeight: 'bold',
        fontSize: 24
    },
    description: {
        color: '#2c3e50',
        fontSize: 18
    },
    buttonWrapper: {
        paddingTop: 10,
        paddingBottom: 15
    },
    button: {
        backgroundColor: '#2c3e50',
        borderRadius: 5,
        padding: 8,
        marginBottom: 5,
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'baseline',
        flexDirection: 'row'
    },
    textButton: {
        color: '#fff',
        fontSize: 18
    },
    commentSection: {
        textAlign: 'left',
        color: '#1abc9c',
        fontWeight: 'bold',
        fontSize: 24
    }
});

//<h1><strong>Un chouette circuit de présentation du projet Akrobat</strong></h1><p><strong>Pourquoi pas découvrir Strasbourg avec les professeurs de la Licence CDAD ?</strong></p><p><br></p><p><u>Amusement garanti !</u></p><p><br></p><p><s>Interdit aux débutants en randonnée</s></p><p><br></p><blockquote>Derrière la montagne se cache l'horizon.</blockquote><p><br></p><ol><li>Plusieurs étapes</li><li>Enigmes à résoudre</li><li>Classement général</li><li>Une boisson à l'arrivée</li></ol><p class="ql-indent-1"><br></p><p><a href="http://iutrs.unistra.fr/" target="_blank">Le lien vers le site de l'IUT</a></p><p><br></p><p>A bientôt !</p>
