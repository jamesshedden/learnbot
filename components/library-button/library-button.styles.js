import React from 'react-native';
import {variables} from '../../variables';

export const styles = React.StyleSheet.create({
  libraryButton: {
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: variables.color.secondary,
    position: 'absolute',
    top: 0,
    right: 0,
    width: variables.buttonHeight,
    height: variables.buttonHeight,
  },
  libraryButtonIcon: {
    width: 30,
    height: 30,
  },
});
