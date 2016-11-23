import React from 'react';
import {styles} from './conversation-item.styles';
import {View, Text, Animated} from 'react-native';

export const ConversationItem = React.createClass({
  propTypes: {
    sender: React.PropTypes.string,
    item: React.PropTypes.string,
    style: React.PropTypes.object,
  },

  getInitialState() {
    return {
      positionAnimValue: new Animated.Value(0),
      opacityAnimValue: new Animated.Value(0),
    };
  },

  _positionAnim() {
    Animated.sequence([
      Animated.timing(
        this.state.positionAnimValue,
        {toValue: -50, duration: 0},
      ),
      Animated.timing(
        this.state.positionAnimValue,
        {toValue: 1, duration: 300},
      ),
    ]).start();
  },

  _opacityAnim() {
    Animated.sequence([
      Animated.timing(
        this.state.opacityAnimValue,
        {toValue: 0.3, duration: 0},
      ),
      Animated.timing(
        this.state.opacityAnimValue,
        {toValue: 1, duration: 300},
      ),
    ]).start();
  },

  componentDidMount() {
    this._positionAnim(this.props.sender);
    this._opacityAnim();
  },

  render() {
    const { positionAnimValue, opacityAnimValue } = this.state;

    const viewAnimStyles = {
      left: positionAnimValue,
      opacity: opacityAnimValue,
    };

    const viewAnimStylesSender = {
      right: positionAnimValue,
      opacity: opacityAnimValue,
    };

    return (
      <Animated.View style={[
        styles.conversationItem,
        this.props.sender ? styles.conversationItemSender : null,
        this.props.style ? this.props.style: null,
        this.props.sender ? viewAnimStylesSender : viewAnimStyles,
      ]}>
        <Text style={[
          styles.conversationItemText,
          this.props.sender ? styles.conversationItemTextSender : null,
        ]}>{this.props.item}</Text>
      </Animated.View>
    );
  },
});
