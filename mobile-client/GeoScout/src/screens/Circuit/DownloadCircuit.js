import React from 'react';
import { StyleSheet, Text } from 'react-native';
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

    componentDidMount() {
        console.log(fileSystem.readDirectory());
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
                    <ListCircuit
                        type={'local'}
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
        backgroundColor: 'white',
        padding: 15,
        paddingBottom: 25
    },
    title: {
        color: '#1abc9c',
        fontWeight: 'bold',
        fontSize: 26
    }
});
