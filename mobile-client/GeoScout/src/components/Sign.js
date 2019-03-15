import React from 'react';
import {
    Button,
    Text,
    StyleSheet,
    View,
    Dimensions,
    Image
} from 'react-native';

const {width,height} = Dimensions.get('window')

export default class Sign extends React.Component{
    constructor(props){
        super(props)
        this.state = {
        }
    }

    componentDidMount() {   
    }

    componentWillUnmount() {
    }

    signin(){
        console.log("Connexion");
    }

    signup(){
        console.log("Inscription");
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                style={{width: (width*0.8), height: (height*0.1)}}
                source={require('../../utils/img/logoGeoScoutWhite.png')}/>
                <Button
                onPress={this.signin()}
                title="Connexion"
                color="#fff"/> 
                <Button
                onPress={this.signup()}
                title="Inscription"
                color="#fff"/>             
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1abc9c'
    },
    big: {
        color: '#8e44ad',
        textAlign: 'center',
        fontSize: 36
    },
    errorText: {
        fontSize: 24,
        textAlign: 'center',
        color: '#2c3e50'
    }
});