import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Header } from 'react-native-elements';
import SideMenu from 'react-native-side-menu';

import api from '../config/httpMethods';
export function PlayDrawerMenu({
    isOpen,
    children,
    toggle,
    navigate,
    circuit: { id_circuit, version, id_step },
    score,
    maxScore: max_score
}) {
    /**
     * Fonction de pause d'un circuit
     */
    const pause = () => {
        api.post('achievedcircuit', {
            id_circuit,
            statut_circuit: 0, // Pause
            version,
            id_step,
            score,
            max_score
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
        api.post('achievedcircuit', {
            id_circuit,
            statut_circuit: 2, // Abandon
            version,
            id_step,
            score,
            max_score
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
        <SideMenu
            isOpen={isOpen}
            disableGestures={true}
            openMenuOffset={150}
            onChange={opened => (opened !== isOpen ? toggle(opened) : null)}
            menu={
                <SafeAreaView style={styles.container}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={clickPause}
                    >
                        <Text>Pause</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={clickAbandon}
                    >
                        <Text>Abandonner</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            }
        >
            {children}
        </SideMenu>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
        justifyContent: 'center',
        padding: 30
    },
    button: {
        width: '90%',
        marginBottom: 15
    }
});

export function PlayHeader({ pressMenu }) {
    return (
        <Header
            leftComponent={{
                icon: 'menu',
                color: 'white',
                onPress: pressMenu
            }}
            backgroundColor="#1abc9c"
        />
    );
}
