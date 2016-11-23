import { Easing } from 'react-native';

export const variables = {
  color: {
    primary: '#4EB5FF',
    secondary: '#DAF9A1',
    primaryLight: '#E3F9FF',
    secondaryLight: '#EDFFCD',
    grayDark: '#444444',
  },
  easing: Easing.bezier(0.55, 0, 0.1, 1),
  borderRadius: 8,
  buttonHeight: 65,
  fontSize: {
    small: 18,
    medium: 24,
  },
  space: {
    small: 5,
    medium: 10,
    large: 20,
    xLarge: 40,
  },
  font: {
    family: 'Avenir',
    size: {
      xSmall: 14,
    },
    weight: {
      light: '400',
      medium: '600',
      heavy: '800',
    },
  },
};
