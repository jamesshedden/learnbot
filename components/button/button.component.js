import React from 'react';
import {styles} from './button.styles';
import {TouchableOpacity, Text, Image} from 'react-native';

export const Button = React.createClass({
  propTypes: {
    onPress: React.PropTypes.func,
    icon: React.PropTypes.string,
    style: React.PropTypes.object,
    text: React.PropTypes.string,
  },

  render() {
    const imageSources = {
      'icon-yes': require('./icon-yes.png'),
      'icon-no': require('./icon-no.png'),
    };

    console.log('this.props', this.props);

    return (
      <TouchableOpacity onPress={this.props.onPress}
      style={[
        styles.button,
        this.props.style,
      ]}>
        <Text style={styles.buttonText}>{this.props.text}</Text>

        { this.props.icon ?
          <Image style={styles.buttonIcon}
          source={imageSources[this.props.icon]}/>
        : null }

      </TouchableOpacity>
    );
  },
});
