import React from 'react';
import {variables} from '../../variables';
import {styles} from './dialog.styles';
import {Button} from '../button/button.component';

import {
  Animated,
  View,
  WebView,
} from 'react-native';

const SCREEN_WIDTH = require('Dimensions').get('window').width;
const SCREEN_HEIGHT = require('Dimensions').get('window').height;
const WEBVIEW_REF = 'webview';

export const Dialog = React.createClass({
  propTypes: {
    closeDialog: React.PropTypes.func,
    dialogAction: React.PropTypes.func,
    webViewSource: React.PropTypes.object,
  },

  getInitialState() {
    return {
      dialogContainerOpacityAnimValue: new Animated.Value(0),
      dialogContentScaleAnimValue: new Animated.Value(0.8),
      status: 'No Page Loaded',
      backButtonEnabled: false,
      forwardButtonEnabled: false,
      scalesPageToFit: true,
    };
  },

  componentDidMount() {
    Animated.timing(this.state.dialogContainerOpacityAnimValue, {
      duration: 100,
      toValue: 1,
    }).start();

    Animated.timing(this.state.dialogContentScaleAnimValue, {
      duration: 100,
      toValue: 1,
    }).start();
  },

  _closeDialog() {
    Animated.timing(this.state.dialogContainerOpacityAnimValue, {
      duration: 100,
      toValue: 0,
    }).start(this.props.closeDialog);

    Animated.timing(this.state.dialogContentScaleAnimValue, {
      duration: 100,
      toValue: 0.8,
    }).start();
  },

  render() {
    return (
      <Animated.View style={[styles.dialog, {
        opacity: this.state.dialogContainerOpacityAnimValue,
      }]}>
        <Animated.View style={{
          width: SCREEN_WIDTH - 40,
          transform: [{
            scale: this.state.dialogContentScaleAnimValue,
          }],
        }}>
          <Button icon={'icon-yes'}
          style={{
            marginLeft: 0,
            borderTopLeftRadius: variables.borderRadius,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            borderTopRightRadius: variables.borderRadius,
          }}
          onPress={this._closeDialog}
          text={'I\'ve finished reading'}/>

          <View style={{
            width: SCREEN_WIDTH - 40,
            height: SCREEN_HEIGHT - 110,
            backgroundColor: 'white',
          }}>
            <WebView style={{flex: 1}}
            ref={WEBVIEW_REF}
            automaticallyAdjustContentInsets={false}
            source={this.props.webViewSource}
            startInLoadingState={true}
            scalesPageToFit={this.state.scalesPageToFit}/>
          </View>
        </Animated.View>
      </Animated.View>
    );
  },
});
