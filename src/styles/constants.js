// @flow
import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');
export const midValue = width / height;

export default {
  buttonHeight: height * 0.09,
  borderRadius: 5,
  activeOpacity: 0.7,
  midValue,
};
