import React from 'react-native';
import {variables} from '../../variables';

export const styles = React.StyleSheet.create({
  button: {
    backgroundColor: variables.color.primary,
    padding: variables.space.large,
    marginLeft: variables.space.large,
    marginTop: 2,
    borderTopLeftRadius: variables.borderRadius,
    borderBottomLeftRadius: variables.borderRadius,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonFirst: {
    marginTop: 0,
  },
  buttonText: {
    fontFamily: variables.font.family,
    color: 'white',
    fontSize: variables.fontSize.small,
    flex: 1,
  },
  buttonIcon: {
    width: 20,
    height: 20,
  },
});
