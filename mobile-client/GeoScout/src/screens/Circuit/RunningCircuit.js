import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Icon } from 'react-native-elements';

import { NavigationHeader } from '../../components/NavigationDrawer';
import ListCircuit from '../../components/ListCircuit';

export default class RunningCircuit extends React.Component {
    static navigationOptions = {
        drawerLabel: 'Circuits en cours',
        drawerIcon: () => (
            <Icon name="watch-later" type="material" color="#1abc9c" />
        )
    };

    render() {
        return (
            <>
                <NavigationHeader
                    pressMenu={this.props.navigation.openDrawer}
                    titleText={'Circuits en cours'}
                    pressHome={() =>
                        this.props.navigation.navigate('GeoLocation')
                    }
                />
                <SafeAreaView style={styles.container}>
                    <ListCircuit
                        type={'achievedCircuit'}
                        format={true}
                        root={'achievedCircuit'}
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
    }
});
