import React from 'react';
import {styles} from './article.styles';

import {
  WebView,
} from 'react-native';

const WEBVIEW_REF = 'webview';

export const Article = React.createClass({
  propTypes: {
    closeDialog: React.PropTypes.func,
    webViewSource: React.PropTypes.object,
  },

  getInitialState() {
    return {
      scalesPageToFit: true,
    };
  },

  render() {
    return (
      <WebView style={styles.article}
      ref={WEBVIEW_REF}
      automaticallyAdjustContentInsets={false}
      source={this.props.webViewSource}
      startInLoadingState={true}
      scalesPageToFit={this.state.scalesPageToFit}/>
    );
  },
});
