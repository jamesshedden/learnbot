import React from 'react';
import {styles} from './dialog.styles';
import {Article} from '../article/article.component';
import {Button} from '../button/button.component';
import {Library} from '../library/library.component';
import {variables} from '../../variables';

import {
  Animated,
  View,
  Dimensions,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const DIALOG_WIDTH = SCREEN_WIDTH - 40;
const DIALOG_HEIGHT = SCREEN_HEIGHT - 40;

const BUTTONS = {
  'article': {
    text: 'I\'ve finished reading',
    icon: 'icon-yes',
  },
  'library': {
    text: 'Things I found interesting',
    icon: 'icon-close',
  },
};

export const Dialog = React.createClass({
  propTypes: {
    closeDialog: React.PropTypes.func,
    dialogAction: React.PropTypes.func,
    webViewSource: React.PropTypes.object,
    dialogContent: React.PropTypes.string,
  },

  getInitialState() {
    return {
      dialogContainerOpacityAnimValue: new Animated.Value(0),
      articleContainerPositionAnimValue: new Animated.Value(0),
      libraryContainerPositionAnimValue: new Animated.Value(0),
      dialogContentScaleAnimValue: new Animated.Value(0.8),
      articleIsVisible: false,
      libraryIsVisible: false,
      webViewSource: this.props.webViewSource,
      onButtonPress: this._closeDialog,
    };
  },

  _showArticle() {
    this.setState({ articleIsVisible: true });
  },

  _showLibrary() {
    this.setState({
      libraryIsVisible: true,
      articleContainerPositionAnimValue: new Animated.Value(DIALOG_WIDTH),
    });
  },

  _hideArticle() {
    this.setState({ articleIsVisible: false });
  },

  _hideLibrary() {
    this.setState({ libraryIsVisible: false });
  },

  _animateArticleIn() {
    this._showArticle();

    Animated.timing(this.state.articleContainerPositionAnimValue, {
      duration: 400,
      toValue: 0,
      easing: variables.easing,
    }).start();

    Animated.timing(this.state.libraryContainerPositionAnimValue, {
      duration: 400,
      toValue: -DIALOG_WIDTH,
      easing: variables.easing,
    }).start();
  },

  _animateLibraryIn() {
    Animated.timing(this.state.libraryContainerPositionAnimValue, {
      duration: 400,
      toValue: 0,
      easing: variables.easing,
    }).start();

    Animated.timing(this.state.articleContainerPositionAnimValue, {
      duration: 400,
      toValue: DIALOG_WIDTH,
      easing: variables.easing,
    }).start();

    this.setState({ onButtonPress: this._closeDialog });
  },

  componentDidMount() {
    this.props.dialogContent === 'article' ? this._showArticle() : null;
    this.props.dialogContent === 'library' ? this._showLibrary() : null;

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

  _viewArticle(articleUrl) {
    this.setState({
      webViewSource: { uri: articleUrl },
      onButtonPress: this._animateLibraryIn,
    });

    this._animateArticleIn();
  },

  render() {
    return (
      <Animated.View style={[styles.dialog, {
        opacity: this.state.dialogContainerOpacityAnimValue,
      }]}>
        <Animated.View style={[styles.dialogContainer, {
          width: DIALOG_WIDTH,
          height: DIALOG_HEIGHT,
          backgroundColor: variables.color.primary,
          transform: [{ scale: this.state.dialogContentScaleAnimValue }],
        }]}>
          { this.state.articleIsVisible ?
            <Animated.View style={[styles.dialogContentContainer, {
              position: 'absolute',
              width: DIALOG_WIDTH,
              height: DIALOG_HEIGHT,
              left: this.state.articleContainerPositionAnimValue,
            }]}>
              <View style={{ backgroundColor: variables.color.primary }}>
                <Button icon={BUTTONS['article'].icon}
                style={styles.dialogButton}
                noMarginLeft={true}
                onPress={this.state.onButtonPress}
                text={BUTTONS['article'].text}/>
              </View>

              <Article webViewSource={this.state.webViewSource}/>
            </Animated.View>
          : null }

          { this.state.libraryIsVisible ?
            <Animated.View style={[styles.dialogContentContainer, {
              position: 'absolute',
              width: DIALOG_WIDTH,
              height: DIALOG_HEIGHT,
              left: this.state.libraryContainerPositionAnimValue,
            }]}>
              <View style={{ backgroundColor: variables.color.primary }}>
                <Button icon={BUTTONS['library'].icon}
                style={styles.dialogButton}
                noMarginLeft={true}
                onPress={this.state.onButtonPress}
                text={BUTTONS['library'].text}/>
              </View>

              <Library onLibraryItemPress={this._viewArticle}/>
            </Animated.View>
          : null }
        </Animated.View>
      </Animated.View>
    );
  },
});
