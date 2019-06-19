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
import Loading from '../../components/Loading';

export default class DetailCircuit extends React.Component {
    state = {
        isDownload: false,
        id_circuit: null,
        evaluations: [],
        images: [],
        circuit: null,
        favorites: false,
        isReady: false
    };

    componentDidUpdate(prevProps) {
        const { id_circuit } = this.props.navigation.state.params;
        if (id_circuit != prevProps.navigation.state.params.id_circuit) {
            this.getDataCircuit();
            this.setState({ isReady: false });
        }
    }

    async getDataCircuit() {
        const { id_circuit } = this.props.navigation.state.params;
        try {
            var images = [];
            var circuit = null;
            const isDownload = await fileSystem.checkCircuitExist(id_circuit);
            if (isDownload) {
                circuit = await fileSystem.readFile(id_circuit);
            } else {
                circuit = await api.get('download-circuit/' + id_circuit);
            }
            images = circuit.images;
            const evaluations = await api.get(`evaluations/${id_circuit}`);
            const favorite = await api.get(`circuit/is-favorite/${id_circuit}`);
            this.setState({
                isDownload,
                id_circuit,
                images,
                evaluations,
                circuit,
                favorite: favorite.isFavorites,
                isReady: true
            });
        } catch (error) {
            console.log('error try/catch detailCircuit');
            console.log(error);
        }
    }

    componentDidMount() {
        this.getDataCircuit();
    }

    changeFavoriteStatus = () => {
        const { id_circuit } = this.props.navigation.state.params;
        const { favorite } = this.state;
        try {
            if (favorite) {
                api.delete(`favorites/${id_circuit}`).then(() => {
                    this.setState({ favorite: false });
                    ToastAndroid.show(
                        'Circuit supprimé de vos favoris',
                        ToastAndroid.SHORT
                    );
                });
            } else {
                api.post(`favorites/${id_circuit}`).then(() => {
                    this.setState({ favorite: true });
                    ToastAndroid.show(
                        'Circuit ajouté à vos favoris',
                        ToastAndroid.SHORT
                    );
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    alertUser(playOrDownload) {
        const { circuit } = this.state;
        const { navigate } = this.props.navigation;
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
                                circuit: circuit,
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
        const { circuit } = this.state;
        try {
            circuit.Steps.sort((a, b) => a.order - b.order);
            fileSystem.writeFile(id_circuit, circuit);
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
                                circuit,
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
        } catch (error) {
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
        }
    };

    render() {
        const {
            circuit,
            isDownload,
            evaluations,
            images,
            favorite,
            isReady
        } = this.state;
        return (
            <>
                <NavigationHeader
                    pressMenu={this.props.navigation.openDrawer}
                    titleText={'Détail du circuit'}
                    pressHome={() =>
                        this.props.navigation.navigate('GeoLocation')
                    }
                />
                <SafeAreaView style={styles.container}>
                    {isReady ? (
                        <>
                            <ScrollView
                                showsHorizontalScrollIndicator={false}
                                style={{
                                    flex: 1
                                }}
                            >
                                {circuit.name ? (
                                    <Text style={styles.title}>
                                        {circuit.name}
                                    </Text>
                                ) : null}
                                {images.length ? (
                                    <Carousel images={images} />
                                ) : (
                                    <Text style={styles.noContent}>
                                        Pas d'images disponibles sur ce circuit.
                                    </Text>
                                )}
                                {circuit.description ? (
                                    <HTML
                                        html={circuit.description.replace(
                                            /<p[^>]*?><br><\/p>/g,
                                            ''
                                        )}
                                        imagesMaxWidth={
                                            Dimensions.get('window').width
                                        }
                                    />
                                ) : (
                                    <Text style={styles.noContent}>
                                        Pas de description disponible pour ce
                                        circuit.
                                    </Text>
                                )}
                                {evaluations && evaluations.length ? (
                                    <>
                                        <Text style={styles.commentSection}>
                                            Commentaires :
                                        </Text>
                                        <ListComment
                                            evaluations={evaluations}
                                            navigate={
                                                this.props.navigation.navigate
                                            }
                                        />
                                    </>
                                ) : (
                                    <Text style={styles.noContent}>
                                        Pas de commentaires disponible pour ce
                                        circuit.
                                    </Text>
                                )}
                            </ScrollView>
                            <View style={styles.buttonWrapper}>
                                <View style={{ marginRight: 20 }}>
                                    <Icon
                                        name={
                                            favorite
                                                ? 'favorite'
                                                : 'favorite-border'
                                        }
                                        color="#f44336"
                                        size={40}
                                        onPress={() =>
                                            this.changeFavoriteStatus()
                                        }
                                    />
                                </View>
                                <View>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() =>
                                            this.alertUser(isDownload)
                                        }
                                    >
                                        {isDownload ? (
                                            <>
                                                <Icon
                                                    name="play-circle-filled"
                                                    color="white"
                                                />
                                                <Text style={styles.textButton}>
                                                    Jouer
                                                </Text>
                                            </>
                                        ) : (
                                            <>
                                                <Icon
                                                    name="get-app"
                                                    color="white"
                                                />
                                                <Text style={styles.textButton}>
                                                    Télécharger
                                                </Text>
                                            </>
                                        )}
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </>
                    ) : (
                        <Loading />
                    )}
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
        fontSize: 26,
        marginBottom: 10
    },
    description: {
        color: '#2c3e50',
        fontSize: 18,
        marginTop: 10
    },
    buttonWrapper: {
        paddingTop: 10,
        paddingBottom: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: '#2c3e50',
        borderRadius: 5,
        padding: 8,
        marginBottom: 5,
        width: '100%',
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
        fontSize: 24,
        marginBottom: 10
    },
    noContent: {
        color: '#2c3e50',
        fontSize: 16,
        marginTop: 5,
        marginBottom: 10,
        textAlign: 'center'
    }
});
