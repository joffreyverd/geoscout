import React from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import { Icon } from 'react-native-elements';

export default function Rate(props){
    const { rate } = props;
    const sizeIcon = 10;
    
    switch(Math.round(rate)){
    case 0:
        return(
            <View style={{flex: 1, flexDirection: 'row', marginLeft: 5}}>
                <Icon name='star-border' type='material' size={sizeIcon} color='#FFAE23'/>
                <Icon name='star-border' type='material' size={sizeIcon} color='#FFAE23'/>
                <Icon name='star-border' type='material' size={sizeIcon} color='#FFAE23'/>
                <Icon name='star-border' type='material' size={sizeIcon} color='#FFAE23'/>
                <Icon name='star-border' type='material' size={sizeIcon} color='#FFAE23'/>
                <Text style={styles.rateText}> ({rate})</Text>
            </View>
        );
    case 1:
        return(
            <View style={{flex: 1, flexDirection: 'row'}}>
                <Icon name='star' type='material' size={sizeIcon} color='#FFAE23'/>
                <Icon name='star-border' type='material' size={sizeIcon} color='#FFAE23'/>
                <Icon name='star-border' type='material' size={sizeIcon} color='#FFAE23'/>
                <Icon name='star-border' type='material' size={sizeIcon} color='#FFAE23'/>
                <Icon name='star-border' type='material' size={sizeIcon} color='#FFAE23'/>
                <Text style={styles.rateText}> ({rate})</Text>
            </View>
        );
    case 2:
        return(
            <View style={{flex: 1, flexDirection: 'row'}}>
                <Icon name='star' type='material' size={sizeIcon} color='#FFAE23'/>
                <Icon name='star' type='material' size={sizeIcon} color='#FFAE23'/>
                <Icon name='star-border' type='material' size={sizeIcon} color='#FFAE23'/>
                <Icon name='star-border' type='material' size={sizeIcon} color='#FFAE23'/>
                <Icon name='star-border' type='material' size={sizeIcon} color='#FFAE23'/>
                <Text style={styles.rateText}> ({rate})</Text>
            </View>
        );
    case 3:
        return(
            <View style={{flex: 1, flexDirection: 'row'}}>
                <Icon name='star' type='material' size={sizeIcon} color='#FFAE23'/>
                <Icon name='star' type='material' size={sizeIcon} color='#FFAE23'/>
                <Icon name='star' type='material' size={sizeIcon} color='#FFAE23'/>
                <Icon name='star-border' type='material' size={sizeIcon} color='#FFAE23'/>
                <Icon name='star-border' type='material' size={sizeIcon} color='#FFAE23'/>
                <Text style={styles.rateText}> ({rate})</Text>
            </View>
        );
    case 4:
        return(
            <View style={{flex: 1, flexDirection: 'row'}}>
                <Icon name='star' type='material' size={sizeIcon} color='#7f8c8d'/>
                <Icon name='star' type='material' size={sizeIcon} color='#7f8c8d'/>
                <Icon name='star' type='material' size={sizeIcon} color='#7f8c8d'/>
                <Icon name='star' type='material' size={sizeIcon} color='#7f8c8d'/>
                <Icon name='star-border' type='material' size={sizeIcon} color='#7f8c8d'/>
                <Text style={styles.rateText}> ({rate})</Text>
            </View>
        );
    default:
        return(
            <View style={{flex: 1, flexDirection: 'row'}}>
                <Icon name='star' type='material' size={sizeIcon} color='#FFAE23'/>
                <Icon name='star' type='material' size={sizeIcon} color='#FFAE23'/>
                <Icon name='star' type='material' size={sizeIcon} color='#FFAE23'/>
                <Icon name='star' type='material' size={sizeIcon} color='#FFAE23'/>
                <Icon name='star' type='material' size={sizeIcon} color='#FFAE23'/>
                <Text style={styles.rateText}> ({rate})</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rateText: {
      color: '#2c3e50',
      fontSize: 8
    }
  });