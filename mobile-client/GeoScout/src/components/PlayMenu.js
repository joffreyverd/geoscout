import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Alert, View } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import Drawer from 'react-native-drawer-menu';

import api from '../config/httpMethods';

export function PlayDrawerMenu({
    setRefMenu,
    children,
    navigate,
    circuit: { id_circuit, version, id_step },
    score,
    maxScore: max_score,
    startingTime,
    time
}) {
    /**
     * Fonction de pause d'un circuit
     */
    const pause = () => {
        const currentTime = time + (new Date() - startingTime) / (1000 * 60);
        api.post('achievedcircuit', {
            id_circuit,
            statut_circuit: 0, // Pause
            version,
            id_step,
            score,
            max_score,
            achievedTime: currentTime
        })
            .then(() => navigate('Home'))
            .catch(error => {
                Alert.alert('Erreur', error.text);
            });
    };

    /**
     * Fonction d'abandon d'un circuit
     */
    const abandon = () => {
        const currentTime = time + (new Date() - startingTime) / (1000 * 60);
        api.post('achievedcircuit', {
            id_circuit,
            statut_circuit: 2, // Abandon
            version,
            id_step,
            score,
            max_score,
            achievedTime: currentTime
        })
            .then(() => navigate('Home'))
            .catch(error => {
                Alert.alert('Erreur', error.text);
            });
    };

    const clickPause = () => {
        Alert.alert(
            'Pauser',
            'Voulez vous vraiment mettre en pause le circuit ?',
            [{ text: 'Reprendre' }, { text: 'Mettre en pause', onPress: pause }]
        );
    };

    const clickAbandon = () => {
        Alert.alert(
            'Abandonner',
            'Voulez vous vraiment abandonner le circuit ?',
            [
                { text: 'Reprendre' },
                { text: 'Abandonner', onPress: abandon, style: 'cancel' }
            ]
        );
    };
    return (
        <Drawer
            responderNegotiate={_ => false}
            ref={ref => setRefMenu(ref)}
            type="overlay"
            drawerWidth={150}
            drawerContent={
                <View style={styles.container}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={clickPause}
                    >
                        <View style={styles.insideButton}>
                            <Icon name="pause" />
                            <Text style={styles.text}>Pause</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={clickAbandon}
                    >
                        <View style={styles.insideButton}>
                            <Icon name="directions-run" />
                            <Text style={styles.text}>Abandonner</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            }
        >
            {children}
        </Drawer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: '#1abc9c',
        width: '100%',
        padding: 10,
        marginBottom: 15
    },
    insideButton: {
        flexDirection: 'row',
        alignItems: 'baseline'
    },
    text: {
        fontSize: 18,
        color: 'white'
    }
});

export function PlayHeader({ pressMenu, title }) {
    return (
        <Header
            barStyle="light-content"
            leftComponent={{
                icon: 'menu',
                color: 'white',
                onPress: pressMenu,
                size: 36
            }}
            centerComponent={{
                text: title,
                style: { color: 'white', fontSize: 20 }
            }}
            backgroundColor="#1abc9c"
        />
    );
}
