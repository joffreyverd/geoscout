import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';

export default function Rate(props){
    const { rate } = props;
    
    
    switch(Math.round(rate)){
    case 0:
        return(
            <View style={{flex: 1, flexDirection: 'row', marginLeft: 5}}>
            <Icon name='star-border' type='material' size={15} color='#FFAE23'/>
            <Icon name='star-border' type='material' size={15} color='#FFAE23'/>
            <Icon name='star-border' type='material' size={15} color='#FFAE23'/>
            <Icon name='star-border' type='material' size={15} color='#FFAE23'/>
            <Icon name='star-border' type='material' size={15} color='#FFAE23'/>
            </View>
        );
        break;
    case 1:
        return(
            <View style={{flex: 1, flexDirection: 'row'}}>
            <Icon name='star' type='material' size={15} color='#FFAE23'/>
            <Icon name='star-border' type='material' size={15} color='#FFAE23'/>
            <Icon name='star-border' type='material' size={15} color='#FFAE23'/>
            <Icon name='star-border' type='material' size={15} color='#FFAE23'/>
            <Icon name='star-border' type='material' size={15} color='#FFAE23'/>
            </View>
        );
        break;
    case 2:
        return(
            <View style={{flex: 1, flexDirection: 'row'}}>
            <Icon name='star' type='material' size={15} color='#FFAE23'/>
            <Icon name='star' type='material' size={15} color='#FFAE23'/>
            <Icon name='star-border' type='material' size={15} color='#FFAE23'/>
            <Icon name='star-border' type='material' size={15} color='#FFAE23'/>
            <Icon name='star-border' type='material' size={15} color='#FFAE23'/>
            </View>
        );
        break;
    case 3:
        return(
            <View style={{flex: 1, flexDirection: 'row'}}>
            <Icon name='star' type='material' size={15} color='#FFAE23'/>
            <Icon name='star' type='material' size={15} color='#FFAE23'/>
            <Icon name='star' type='material' size={15} color='#FFAE23'/>
            <Icon name='star-border' type='material' size={15} color='#FFAE23'/>
            <Icon name='star-border' type='material' size={15} color='#FFAE23'/>
            </View>
        );
        break;
    case 4:
        return(
            <View style={{flex: 1, flexDirection: 'row'}}>
            <Icon name='star' type='material' size={15} color='#7f8c8d'/>
            <Icon name='star' type='material' size={15} color='#7f8c8d'/>
            <Icon name='star' type='material' size={15} color='#7f8c8d'/>
            <Icon name='star' type='material' size={15} color='#7f8c8d'/>
            <Icon name='star-border' type='material' size={15} color='#7f8c8d'/>
            </View>
        );
        break;
    case 5:
        return(
            <View style={{flex: 1, flexDirection: 'row'}}>
            <Icon name='star' type='material' size={15} color='#FFAE23'/>
            <Icon name='star' type='material' size={15} color='#FFAE23'/>
            <Icon name='star' type='material' size={15} color='#FFAE23'/>
            <Icon name='star' type='material' size={15} color='#FFAE23'/>
            <Icon name='star' type='material' size={15} color='#FFAE23'/>
            </View>
        );
        break;
    default:
        return(
            <View style={{flex: 1, flexDirection: 'row'}}>
            <Icon name='star' type='material' size={15} color='#FFAE23'/>
            <Icon name='star' type='material' size={15} color='#FFAE23'/>
            <Icon name='star' type='material' size={15} color='#FFAE23'/>
            <Icon name='star' type='material' size={15} color='#FFAE23'/>
            <Icon name='star' type='material' size={15} color='#FFAE23'/>
            </View>
        );
        break;
    }
}