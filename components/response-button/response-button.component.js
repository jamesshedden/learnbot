import React from 'react';
import {Button} from '../button/button.component';

export const ResponseButton = React.createClass({
  propTypes: {
    onPress: React.PropTypes.func,
    index: React.PropTypes.number,
    response: React.PropTypes.string,
    icon: React.PropTypes.string,
  },

  render() {
    return (
      <Button onPress={this.props.onPress}
      style={this.props.index === 0 ? { marginTop: 0 } : null}
      text={this.props.response}
      icon={this.props.icon}/>
    );
  },
});
