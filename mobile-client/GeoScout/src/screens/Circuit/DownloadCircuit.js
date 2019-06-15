import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Icon } from 'react-native-elements';

import { NavigationHeader } from '../../components/NavigationDrawer';
import ListCircuit from '../../components/ListCircuit';
import fileSystem from '../../config/fileSystem';

export default class DownloadCircuit extends React.Component {
    static navigationOptions = {
        drawerLabel: 'Circuits téléchargés',
        drawerIcon: ({ tintColor }) => (
            <Icon name="get-app" type="material" color="#1abc9c" />
        )
    };

    async deleteCircuits() {
        fileSystem.deleteAllCircuits();
    }

    render() {
        return (
            <>
                <NavigationHeader
                    pressMenu={this.props.navigation.openDrawer}
                    titleText={'Téléchargé'}
                    pressHome={() =>
                        this.props.navigation.navigate('GeoLocation')
                    }
                />
                <SafeAreaView style={styles.container}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.deleteCircuits()}
                    >
                        <Text style={styles.textButton}>
                            Supprimer tous mes circuits
                        </Text>
                    </TouchableOpacity>
                    <ListCircuit
                        type={'local'}
                        format={true}
                        navigate={this.props.navigation.navigate}
                    />
                </SafeAreaView>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dedede',
        padding: 10
    },
    title: {
        color: '#1abc9c',
        fontWeight: 'bold',
        fontSize: 26
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
