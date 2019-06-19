import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Alert, View } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import Drawer from 'react-native-drawer-menu';

import api from '../config/httpMethods';
// import { stopLocationTask } from '../config/LocationTask';

export function PlayDrawerMenu({
    setRefMenu,
    children,
    navigate,
    circuit: { id_circuit, version, id_step },
    score,
    maxScore: max_score,
    startingTime,
    time,
    id_achieved
}) {
    /**
     * Fonction de pause ou d'abandon d'un circuit
     */
    const stop = statut => {
        // stopLocationTask();
        const currentTime = time + (new Date() - startingTime) / (1000 * 60);
        const body = {
            id_circuit,
            statut_circuit: statut,
            version,
            id_step,
            score,
            max_score,
            achievedTime: currentTime
        };
        let save = null;
        if (id_achieved) {
            save = () => api.put(`achievedcircuit/${id_achieved}`, body);
        } else {
            save = () => api.post('achievedcircuit', body);
        }

        save()
            .then(() => navigate('Home'))
            .catch(error => {
                Alert.alert('Erreur', error.text);
            });
    };

    const clickPause = () => {
        Alert.alert(
            'Pauser',
            'Voulez vous vraiment mettre en pause le circuit ?',
            [
                { text: 'Reprendre' },
                { text: 'Mettre en pause', onPress: () => stop(0) }
            ]
        );
    };

    const clickAbandon = () => {
        Alert.alert(
            'Abandonner',
            'Voulez vous vraiment abandonner le circuit ?',
            [
                { text: 'Reprendre' },
                { text: 'Abandonner', onPress: () => stop(2), style: 'cancel' }
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
                style: {
                    color: 'white',
                    fontSize: 20
                }
            }}
            backgroundColor="#1abc9c"
        />
    );
}
