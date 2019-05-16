import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

import { Icon } from 'react-native-elements';
import Rate from './Rate';
import Difficulty from './Difficulty';

const {width,height} = Dimensions.get('window')

export default function Callout(props){
  const { name, rate, distance, timeInHour, timeInMinute, difficulty } = props;
  const sizeIcon = 12;
  return (
    <View style={styles.container}>
      <Text style={styles.name} numberOfLines={1}>{name}</Text>
      <Rate rate={rate}/>
      <View style={styles.inline}>
        <Icon name='directions-walk' type='material' size={sizeIcon} color='#2c3e50'/>
        <Text style={styles.item}>{distance}km</Text>
        <Icon name='access-time' type='material' size={sizeIcon} color='#2c3e50'/>
        <Text style={styles.item}>{timeInHour}h{timeInMinute}m</Text>
        {/* <View>
          <Difficulty difficulty={difficulty}/>
        </View> */}
      </View>
    </View>
  );
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
  },
  item: {
    color: '#95a5a6',
    fontSize: 12,
    marginRight: 8,
    marginLeft: 1
  },
  inline: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
});