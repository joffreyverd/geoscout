import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

export default function Difficulty(props){
  const {difficulty} = props;
  return (
    <View style={styles.inline}>
      {difficulty[0] ? <View style={styles.circle} backgroundColor={"#4CAF50"}></View> : null}
      {difficulty[1] ? <View style={styles.circle} backgroundColor={"#2196F3"}></View> : null}
      {difficulty[2] ? <View style={styles.circle} backgroundColor={"#F44336"}></View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  inline: {
    flex: 1,
    flexDirection: 'row'
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 10/2,
    marginRight: 2
  }
});