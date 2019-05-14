import React, {Component} from 'react';
import {
    Text
  } from 'react-native';

export default class Marquee extends Component(){
    constructor(){
        super(); 
        this.Animated = new Animated.Value(0);
    }

    animate(){
        this.animated.setValue(0);
        Animated.timing(this.animated, {
            toValue: 1,
            duration: 2000
        }).start();
    }

    render(){
        const { style, text } = this.props;
        
        return(
          <Animated.Text
          style={style}>
              {text}
          </Animated.Text>
        );
    }
}