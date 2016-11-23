import React from 'react';
import _ from 'lodash';

import {styles} from './app.styles.js';
import {SCRIPT} from '../../constants/script';
import {Articles} from '../../services/articles/articles';

import {Conversation} from '../conversation/conversation.component';
import {Dialog} from '../dialog/dialog.component';
import {ProgressIndicator} from '../progress-indicator/progress-indicator.component';
import {ResponseButton} from '../response-button/response-button.component';
import {ResponseButtons} from '../response-buttons/response-buttons.component';
import {ResponseInput} from '../response-input/response-input.component';
import {LibraryButton} from '../library-button/library-button.component';

import {
  View,
  AsyncStorage,
  Keyboard,
  LayoutAnimation,
} from 'react-native';

export const App = React.createClass({
  getInitialState() {
    return {
      conversation: [], // should be from DB eventually
      dialog: false,
      responses: [],
      responseButtons: [],
      isLoading: false,
      responseInputSubmit: null,
      showResponseInput: false,
      showResponseButtons: false,
    };
  },

  _openDialog() {
    this.setState({
      dialog: true,
    });
  },

  _openLibrary() {
    this.setState({
      dialogContent: 'library',
    });

    this._openDialog();
  },

  _openArticle() {
    this.setState({
      dialogContent: 'article',
    });

    this._openDialog();
  },

  _closeDialog() {
    this.setState({dialog: false});
  },

  _finishReading() {
    this._closeDialog();

    this._sendMessages(['I\'ve finished reading'], 'me').then(() => {
      this._readScript(SCRIPT.QUESTION_INTEREST);
    });
  },

  _timeTyping() {

  },

  _getRandomDelay() {
    return Math.floor(Math.random() * 2000) + 500;
  },

  _sendMessage(message, sender) {
    return new Promise((resolve) => {
      const conversation = _.cloneDeep(this.state.conversation);

      if (sender) {
        conversation.push({ message, sender });
        this.setState({ conversation });
        resolve(message);
      } else {
        this.setState({ conversation, isLoading: true });

        setTimeout(() => {
          this.setState({ isLoading: false });
          conversation.push({ message });
          this.setState({ conversation });
          resolve(message);
        }, this._getRandomDelay());
      }
    });
  },

  _sendMessages(messages, sender) {
    let count = 0;
    const ctrl = this;

    return new Promise((resolve) => {
      function sendMessage() {
        return ctrl._sendMessage(messages[count], sender).then(() => {
          count++;

          if (count < messages.length) {
            setTimeout(sendMessage, Math.floor(Math.random() * 1000) + 250);
          } else {
            resolve();
          }
        });
      }

      sendMessage();
    });
  },

  _setResponseButtons(responses) {
    const responseButtons = [];

    function respond(response, shouldOpenArticle) {
      this.setState({ showResponseButtons: false });

      this._sendMessages(response.messages, 'me').then(() => {
        if (shouldOpenArticle) {
          this._openArticle();
        } else {
          setTimeout(() => {
            this._readScript(response.nextDialogOption);
          }, Math.floor(Math.random() * 1000) + 250);
        }
      });
    }

    responses.map((response, index) => {
      const shouldOpenArticle = response === SCRIPT.YES_TO_SUGGEST_TOPIC ?
        true : false;

      responseButtons.push(
        <ResponseButton key={index} index={index}
        icon={response.icon}
        onPress={respond.bind(this, response, shouldOpenArticle)}
        response={response.messages.join('')}/>
      );
    });

    this.setState({ responseButtons });

    // V hacky for now, but buttons always appear after the delay of the last message before the buttons
    setTimeout(this.setState.bind(this, {showResponseButtons: true}), 500);
  },

  _setResponseInput(nextDialogOption) {
    const ctrl = this;
    setTimeout(ctrl.setState.bind(this, {showResponseInput: true}), 500);

    function handleChange(value) {
      AsyncStorage.setItem('learnbot_username', value);
    }

    function handleSubmit() {
      AsyncStorage.getItem('learnbot_username').then((username) => {
        ctrl.setState({ showResponseInput: false });

        ctrl._sendMessages([username], 'me').then(() => {
          setTimeout(() => {
            ctrl._readScript(nextDialogOption);
          }, Math.floor(Math.random() * 1000) + 250);
        });
      });
    }

    ctrl.setState({
      responseInputSubmit: handleSubmit,
      responseInputChange: handleChange,
    });
  },

  componentDidUpdate() {
    // console.info('componentDidUpdate', this.state);
  },

  _readScript(position) {
    const ctrl = this;

    function sendMessages(messages) {
      ctrl._sendMessages(messages).then(() => {
        if (position.nextDialogOption) {
          setTimeout(() => ctrl._readScript(position.nextDialogOption), Math.floor(Math.random() * 1000) + 250);
        }

        if (position === SCRIPT.CHOOSE_NAME) {
          return ctrl._setResponseInput(position.branches[0]);
        }

        if (position.branches) {
          return ctrl._setResponseButtons(position.branches);
        }
      });
    }

    if (position === SCRIPT.SUGGEST_TOPIC) {
      Articles.findOne().then((response) => {
        this.setState({
          webViewSource: response.url,
        });

        sendMessages([
          `Would you like to learn about ${response.title}?`,
          `${response.extract}`,
        ]);
      });
    } else if (position === SCRIPT.LEARNBOT_INTRO) {
      AsyncStorage.getItem('learnbot_username').then((username) => {
        sendMessages(position.messages(username));
      });
    } else {
      sendMessages(position.messages);
    }
  },

  _keyboardWillShow(event) {
    LayoutAnimation.configureNext(LayoutAnimation.create(
      event.duration,
      LayoutAnimation.Types[event.easing]
    ));

    this.setState({
      keyboardHeight: event.endCoordinates.height,
      keyboardIsVisible: true,
    });
  },

  _keyboardWillHide(event) {
    LayoutAnimation.configureNext(LayoutAnimation.create(
      event.duration,
      LayoutAnimation.Types[event.easing]
    ));

    this.setState({
      keyboardHeight: null,
      keyboardIsVisible: false,
    });
  },

  componentDidMount() {
    Keyboard.addListener('keyboardWillShow', this._keyboardWillShow);
    Keyboard.addListener('keyboardWillHide', this._keyboardWillHide);

    this._readScript(SCRIPT.HELLO);
  },

  render() {
    const DIALOG_CLOSE = {
      'article': this._finishReading,
      'library': this._closeDialog,
    };

    return (
      <View style={[styles.app, {
        marginBottom: this.state.keyboardHeight,
      }]}>
        <LibraryButton onPress={this._openLibrary}/>

        <Conversation conversation={this.state.conversation}/>
        { this.state.isLoading ? <ProgressIndicator/> : null}

        { this.state.showResponseInput ?
          <ResponseInput responseInput={this.state.responseInput}
          onSubmit={this.state.responseInputSubmit}
          onChange={this.state.responseInputChange}/>
        : null }

        { this.state.showResponseButtons ?
          <ResponseButtons responses={this.state.responseButtons}/>
        : null }

        { this.state.dialog ?
          <Dialog closeDialog={DIALOG_CLOSE[this.state.dialogContent]}
          dialogContent={this.state.dialogContent}
          dialogAction={this._dialogAction}
          webViewSource={{ uri: this.state.webViewSource }}/>
        : null }
      </View>
    );
  },
});
