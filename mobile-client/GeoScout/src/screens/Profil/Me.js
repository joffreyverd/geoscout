import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet, View, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';

import { NavigationHeader } from '../../components/NavigationDrawer';
import storage from '../../config/asyncStorageToken';
import api from '../../config/httpMethods';
import Loading from '../../components/Loading';

export default class Me extends Component {
    static navigationOptions = {
        drawerLabel: 'Profil',
        drawerIcon: ({ tintColor }) => (
            <Icon name="user-circle" type="font-awesome" color="#1abc9c" />
        )
    };

    constructor() {
        super();
        this.state = {
            user: {
                lastname: '',
                firstname: '',
                email: '',
                img: ''
            },
            infoUser: null,
            isReady: false
        };
    }

    async componentDidMount() {
        try {
            const token = await storage.getTokenAsyncStorage();
            if (token) {
                const user = await api.get('whoami');
                const img = await api.post('download', {
                    id: user.id_user,
                    type: 'user'
                });
                const infoUser = await api.get(`user-info/${user.id_user}`);
                this.setState({ user, img, infoUser, isReady: true });
            } else {
                this.props.navigation.navigate('Auth');
            }
        } catch (error) {
            console.log(error);
        }
    }

    handleSettingsPress = () => {
        this.props.navigation.navigate('Settings');
    };

    render() {
        const { user, img, infoUser, isReady } = this.state;
        console.log(infoUser);
        return (
            <>
                <NavigationHeader
                    pressMenu={this.props.navigation.openDrawer}
                    titleText={'Profil'}
                    pressHome={() =>
                        this.props.navigation.navigate('GeoLocation')
                    }
                />
                <SafeAreaView style={styles.container}>
                    {isReady ? (
                        <>
                            <View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Image
                                    source={
                                        !img || img.length < 1
                                            ? require('../../../utils/img/userAnonymous.png')
                                            : {
                                                  uri: `http://www.geoscout.fr:5555${img}`
                                              }
                                    }
                                    style={styles.image}
                                />
                            </View>
                            <View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Text style={styles.profilName}>
                                    {user.lastname} {user.firstname}
                                </Text>
                            </View>
                            <View style={styles.infoSection}>
                                <View style={styles.containerInfoUser}>
                                    <Text style={styles.infoUser}>
                                        {infoUser.circuits_created}
                                    </Text>
                                    <Text style={styles.labelInfo}>
                                        Circuits créés
                                    </Text>
                                </View>
                                <View style={styles.containerInfoUser}>
                                    <Text style={styles.infoUser}>
                                        {infoUser.circuits_played}
                                    </Text>
                                    <Text style={styles.labelInfo}>
                                        Circuits complétés
                                    </Text>
                                </View>
                                <View style={styles.containerInfoUser}>
                                    <Text style={styles.infoUser}>
                                        {infoUser.comments_posted}
                                    </Text>
                                    <Text style={styles.labelInfo}>
                                        Commentaires postés
                                    </Text>
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

//Feuille de style
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    button: {
        backgroundColor: '#2c3e50',
        borderRadius: 5,
        padding: 8,
        marginBottom: 10,
        width: '90%',
        alignItems: 'center'
    },
    textButton: {
        color: '#fff',
        fontSize: 18
    },
    profilName: {
        color: '#2c3e50',
        fontSize: 28,
        marginTop: 10
    },
    labelInfo: {
        color: '#2c3e50',
        fontSize: 18
    },
    infoUser: {
        color: '#1abc9c',
        fontSize: 24,
        marginRight: 5
    },
    infoSection: {
        padding: 10,
        marginTop: 10,
        backgroundColor: '#CAF9F0',
        borderWidth: 1,
        borderColor: '#9BEBDB'
    },
    containerInfoUser: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: 300
    }
});
