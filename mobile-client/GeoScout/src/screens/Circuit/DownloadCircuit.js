import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import {
    NavigationHeader,
    NavigationMenu
} from '../../components/NavigationMenu';
import ListCircuit from '../../components/ListCircuit';
import fileSystem from '../../config/fileSystem';

export default class DownloadCircuit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false
        };
    }

    componentDidMount() {
        console.log('directory have : ' + fileSystem.readDirectory());
    }

    render() {
        const { menuOpen } = this.state;
        return (
            <NavigationMenu
                isOpen={menuOpen}
                toggle={menuOpen => this.setState({ menuOpen })}
                navigate={this.props.navigation.navigate}
            >
                <NavigationHeader
                    pressMenu={() => this.setState({ menuOpen: true })}
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
            </NavigationMenu>
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
