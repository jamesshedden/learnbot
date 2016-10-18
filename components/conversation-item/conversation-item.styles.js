import React from 'react-native';
import {variables} from '../../variables';

export const styles = React.StyleSheet.create({
  conversationItem: {
    padding: variables.space.large,
    backgroundColor: 'white',
    marginRight: variables.space.large,
  },
  conversationItemText: {
    color: variables.color.grayDark,
    fontFamily: variables.font.family,
    fontSize: variables.fontSize.small,
  },
  conversationItemSender: {
    backgroundColor: variables.color.primaryLight,
    marginLeft: variables.space.large,
    marginRight: 0,
  },
  conversationItemTextSender: {
    color: variables.color.primary,
    fontFamily: variables.font.family,
  },
});
