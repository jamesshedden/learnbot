import {variables} from '../../variables';
const React = require('react-native');

export const styles = React.StyleSheet.create({
  dialog: {
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,.3)',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  dialogContainer: {
    backgroundColor: variables.color.primary,
    overflow: 'hidden',
    borderTopLeftRadius: variables.borderRadius,
    borderBottomLeftRadius: variables.borderRadius,
    borderBottomRightRadius: variables.borderRadius,
    borderTopRightRadius: variables.borderRadius,
  },
  dialogButton: {
    marginLeft: 0,
    marginTop: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  dialogContentContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: variables.borderRadius,
    borderBottomLeftRadius: variables.borderRadius,
    borderBottomRightRadius: variables.borderRadius,
    borderTopRightRadius: variables.borderRadius,
    overflow: 'hidden',
  },
});
