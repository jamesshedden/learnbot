import React from 'react';
import {styles} from './response-input.styles';
import {TextInput, View, Animated} from 'react-native';

export const ResponseInput = React.createClass({
  propTypes: {
    onSubmit: React.PropTypes.func,
    onChange: React.PropTypes.func,
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
        {toValue: 60, duration: 300},
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
      <Animated.View style={viewAnimStyle}>
        <View style={styles.responseInput}>
          <TextInput style={styles.responseInputText}
          onSubmitEditing={this.props.onSubmit}
          onChangeText={(option) => this.props.onChange(option)}
          placeholder='Write your name'
          placeholderTextColor='white'/>
        </View>
      </Animated.View>
    );
  },
});
