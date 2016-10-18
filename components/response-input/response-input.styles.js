import React from 'react-native';
import {variables} from '../../variables';

export const styles = React.StyleSheet.create({
  responseInput: {
    padding: variables.space.large,
    marginLeft: variables.space.large,
    borderTopLeftRadius: variables.borderRadius,
    backgroundColor: variables.color.primary,
    borderBottomLeftRadius: variables.borderRadius,
  },
  responseInputText: {
    fontFamily: variables.font.family,
    fontSize: variables.fontSize.small,
    height: variables.fontSize.small + 6,
    color: '#FFFFFF',
  },
});
