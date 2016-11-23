import React from 'react';
import {styles} from './button.styles';
import {TouchableOpacity, Text, Image} from 'react-native';

export const Button = React.createClass({
  propTypes: {
    onPress: React.PropTypes.func,
    icon: React.PropTypes.string,
    noMarginTop: React.PropTypes.bool,
    noMarginLeft: React.PropTypes.bool,
    text: React.PropTypes.string,
  },

  render() {
    const imageSources = {
      'icon-yes': require('./icon-yes.png'),
      'icon-no': require('./icon-no.png'),
      'icon-close': require('./icon-close.png'),
    };

    return (
      <TouchableOpacity onPress={this.props.onPress}
      style={[
        styles.button,
        this.props.noMarginTop ? { marginTop: 0 } : null,
        this.props.noMarginLeft ? { marginLeft: 0 } : null,
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
