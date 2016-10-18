import {variables} from '../../variables';
const React = require('react-native');

export const styles = React.StyleSheet.create({
  dialog: {
    backgroundColor: 'rgba(0,0,0,.3)',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogText: {
    fontFamily: variables.font.family,
    fontWeight: variables.font.weight.light,
    fontSize: variables.font.size.xSmall,
    color: variables.color.primary,
    margin: variables.space.large,
    textAlign: 'center',
  },
  dialogWebView: {
    borderBottomLeftRadius: variables.borderRadius,
    borderBottomRightRadius: variables.borderRadius,
  },
});
