// @flow
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export default {
  buttonHeight: height * 0.09,
  borderRadius: 5,
  activeOpacity: 0.7,
};
