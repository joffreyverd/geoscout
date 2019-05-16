import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Icon } from 'react-native-elements';
import {
    NavigationHeader,
    NavigationMenu
} from '../../components/NavigationMenu';
// import fileSystem from '../../config/fileSystem';

export default class DownloadCircuit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: true,
            menuOpen: false
        };
    }

    componentDidMount() {
        this.getCircuitDownload();
        //NON CORRECT ???
        this.setState({
            isReady: true
        });
    }

    getCircuitDownload() {
        // let refCircuits = fileSystem.readDir();
        // return <FlatList
        //     data={[refCircuits.map((file) => {
        //         return ({key: file.path});
        //     })]}
        //     renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}/>;
    }

    render() {
        const { isReady, menuOpen } = this.state;
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
                {/* <SafeAreaView style={styles.container}>
                    {(isReady) && 
                        this.getCircuitDownload()
                    }
                </SafeAreaView> */}
                <SafeAreaView style={styles.container}>
                    <Text style={styles.title}>En construction</Text>
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
