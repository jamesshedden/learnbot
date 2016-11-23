import React from 'react';
import {styles} from './library-item.styles';
import {TouchableOpacity, Text} from 'react-native';
import {variables} from '../../variables';

export const LibraryItem = React.createClass({
  propTypes: {
    children: React.PropTypes.node,
    isLastItem: React.PropTypes.bool,
    onPress: React.PropTypes.func,
  },

  render() {
    return (
      <TouchableOpacity
      onPress={this.props.onPress}
      style={[
        styles.libraryItem,
        this.props.isLastItem ? null : {
          borderBottomWidth: 1,
          borderColor: variables.color.secondary,
        },
      ]}>
        <Text style={styles.libraryItemText}>
          {this.props.children}
        </Text>
      </TouchableOpacity>
    );
  },
});
