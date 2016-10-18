import React from 'react';
import {styles} from '../progress-indicator/progress-indicator.styles';
import {Image, Animated, View} from 'react-native';

export const ProgressIndicator = React.createClass({
  getInitialState() {
    return {
      rotateAnimValue: new Animated.Value(0),
      positionAnimValue: new Animated.Value(0),
      heightAnimValue: new Animated.Value(0),
    };
  },

  componentDidMount() {
    this._rotateAnim();
    this._heightAnim();
    this._positionAnim();
  },

  _rotateAnim() {
    Animated.sequence([
      Animated.timing(
        this.state.rotateAnimValue,
        {toValue: 0, duration: 0},
      ),
      Animated.timing(
        this.state.rotateAnimValue,
        {toValue: 1, duration: 500},
      ),
      Animated.delay(300),
    ]).start(this._rotateAnim);
  },

  _heightAnim() {
    Animated.sequence([
      Animated.timing(
        this.state.heightAnimValue,
        {toValue: 0, duration: 0},
      ),
      Animated.timing(
        this.state.heightAnimValue,
        {toValue: 55, duration: 200},
      ),
    ]).start();
  },

  _positionAnim() {
    Animated.sequence([
      Animated.timing(
        this.state.positionAnimValue,
        {toValue: 100, duration: 0},
      ),
      Animated.timing(
        this.state.positionAnimValue,
        {toValue: 0, duration: 200},
      ),
    ]).start();
  },

  componentDidUpdate() {
    // console.log('ProgressIndicator componentDidUpdate', this.props.sender);
  },

  render() {
    const {
      rotateAnimValue,
      positionAnimValue,
      heightAnimValue,
    } = this.state;

    const imageAnimStyles = {
      transform: [{
        rotate: rotateAnimValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '-360deg'],
        }),
      }],
    };

    const viewAnimStyle = {
      top: positionAnimValue,
      height: heightAnimValue,
    };

    return (
      <Animated.View style={viewAnimStyle}>
        <Animated.Image style={[styles.progressIndicator, imageAnimStyles]}
        source={require('./progress-indicator.png')}/>
      </Animated.View>
    );
  },
});
