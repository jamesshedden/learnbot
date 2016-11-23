import React from 'react';
import {styles} from './library-button.styles';
import {TouchableOpacity, Image} from 'react-native';

export const LibraryButton = React.createClass({
  propTypes: {
    onPress: React.PropTypes.func,
    icon: React.PropTypes.string,
    text: React.PropTypes.string,
  },

  render() {
    const imageSource = require('./library-button-icon.png');

    return (
      <TouchableOpacity onPress={this.props.onPress}
      style={styles.libraryButton}>
        <Image style={styles.libraryButtonIcon}
        source={imageSource}/>
      </TouchableOpacity>
    );
  },
});
