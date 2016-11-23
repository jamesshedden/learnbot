import React from 'react';
import _ from 'lodash';
import {styles} from './conversation.styles';
import {ScrollView} from 'react-native';

const SCREEN_WIDTH = require('Dimensions').get('window').width;
const SCREEN_HEIGHT = require('Dimensions').get('window').height;

import {ConversationItem} from '../conversation-item/conversation-item.component';

export const Conversation = React.createClass({
  propTypes: {
    conversation: React.PropTypes.array,
    isOffset: React.PropTypes.bool,
  },

  _presentConversation(conversation) {
    conversation.map((item, index) => {
      const currentItemSender =  _.get(item, 'sender');
      const previousItemSender = _.get(conversation[index - 1], 'sender');
      item.isConsecutive = currentItemSender === previousItemSender;
    });

    return conversation;
  },

  render() {
    let contentOffset = this.props.isOffset ? { x: 0, y: 100 } : null;

    return (
      <ScrollView contentContainerStyle={[styles.conversation, {
        width: SCREEN_WIDTH,
        // height: SCREEN_HEIGHT,
      }]}
      contentOffset={contentOffset}
      alwaysBounceVertical={false}
      showsVerticalScrollIndicator={false}>
        {this._presentConversation(this.props.conversation).map((item, index) => {
          return (
            <ConversationItem style={ _.get(item, 'isConsecutive') ? { marginTop: 2 } : null }
            key={index}
            item={_.get(item, 'message')}
            sender={_.get(item, 'sender')}/>
          );
        })}
      </ScrollView>
    );
  },
});
