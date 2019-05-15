import React from 'react';
import {
    StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import fileSystem from '../../config/fileSystem';

export default class DownloadCircuit extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isReady: true
        }
    }

    componentDidMount(){
        this.getCircuitDownload();
        //NON CORRECT ???
        this.setState({
            isReady: true
        });
    }

    getCircuitDownload(){
        let refCircuits = fileSystem.readDir();
        return <FlatList
            data={[refCircuits.map((file) => {
                return ({key: file.path});
            })]}
            renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}/>;
    }

    render() {
        const { isReady } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                {(isReady) && 
                    this.getCircuitDownload()
                }
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginRight: 10,
        marginLeft: 10,
        marginTop: 25
    }
});
