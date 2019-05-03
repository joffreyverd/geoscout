import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

import { Icon } from 'react-native-elements';

import Rate from '../components/Rate';

const {width,height} = Dimensions.get('window')

export default class Callout extends Component {
  render() {
    const { name, rate } = this.props;
    return (
        <View style={styles.container}>
            <Text style={styles.name}>{name}</Text>
            <Rate rate={rate}/>
            <View>
              <Text>14 Km</Text>
              <Icon name='star-border' type='material' size={10} color='#FFAE23'/>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    width: width/2,
    height: height*0.09
  },
  name: {
    color: '#1abc9c',
    fontSize: 18,
    fontWeight: 'bold'
  }
});