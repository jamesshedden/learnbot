import React from 'react';
import {styles} from './library.styles';
import { ScrollView, Text } from 'react-native';
import {LibraryItem} from '../library-item/library-item.component';

const LIBRARY_ITEMS = [
  {
    title: 'Test title 1',
    url: 'https://en.wikipedia.org/wiki/Extreme_points_of_Earth',
  },
  {
    title: 'Test title 2',
    url: 'https://en.wikipedia.org/wiki/Extreme_points_of_Earth',
  },
  {
    title: 'Test title 3',
    url: 'https://en.wikipedia.org/wiki/Extreme_points_of_Earth',
  },
  {
    title: 'Test title 4',
    url: 'https://en.wikipedia.org/wiki/Extreme_points_of_Earth',
  },
  {
    title: 'Test title 5',
    url: 'https://en.wikipedia.org/wiki/Extreme_points_of_Earth',
  },
  {
    title: 'Test title 6',
    url: 'https://en.wikipedia.org/wiki/Extreme_points_of_Earth',
  },
  {
    title: 'Test title 7',
    url: 'https://en.wikipedia.org/wiki/Extreme_points_of_Earth',
  },
  {
    title: 'Test title 8',
    url: 'https://en.wikipedia.org/wiki/Extreme_points_of_Earth',
  },
  {
    title: 'Test title 9',
    url: 'https://en.wikipedia.org/wiki/Extreme_points_of_Earth',
  },
  {
    title: 'Test title 10',
    url: 'https://en.wikipedia.org/wiki/Extreme_points_of_Earth',
  },
  {
    title: 'Test title 11',
    url: 'https://en.wikipedia.org/wiki/Extreme_points_of_Earth',
  },
];

export const Library = React.createClass({
  propTypes: {
    onLibraryItemPress: React.PropTypes.func,
  },

  _onPress(url) {
    this.props.onLibraryItemPress(url);
  },

  render() {
    return (
      <ScrollView alwaysBounceVertical={false}
      showsVerticalScrollIndicator={false}>
        { LIBRARY_ITEMS.map((item, index) => {
          return (
            <LibraryItem onPress={this._onPress.bind(this, item.url)}
            key={index}
            isLastItem={index === LIBRARY_ITEMS.length - 1}>
              {item.title}
            </LibraryItem>
          );
        }) }
      </ScrollView>
    );
  },
});
