import React from 'react';
import {View, Animated} from 'react-native';

import {variables} from '../../variables';
import {styles} from './response-buttons.styles';

export const ResponseButtons = React.createClass({
  propTypes: {
    responses: React.PropTypes.array,
  },

  getInitialState() {
    return {
      heightAnimValue: new Animated.Value(0),
    };
  },

  _heightAnim() {
    Animated.sequence([
      Animated.timing(
        this.state.heightAnimValue,
        {toValue: 0, duration: 0},
      ),
      Animated.timing(
        this.state.heightAnimValue,
        {toValue: variables.buttonHeight * this.props.responses.length, duration: 300},
      ),
    ]).start();
  },

  componentDidMount() {
    this._heightAnim();
  },

  render() {
    const { heightAnimValue } = this.state;

    const viewAnimStyle = {
      height: heightAnimValue,
    };

    return (
      <Animated.View style={[
        styles.responseButtons,
        viewAnimStyle,
      ]}>
        {this.props.responses}
      </Animated.View>
    );
  },
});
