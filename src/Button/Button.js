// @flow
import React from 'react';
import { Dimensions, Text, TouchableOpacity } from 'react-native';

import { colors, constants } from '../styles';

const { width } = Dimensions.get('window');

type Props = {
  inverse: boolean,
  large: boolean,
  text: string,
  disable: boolean,
  color: string,
  onPress: () => void,
  style?: Object,
};

class Button extends React.Component<Props> {
  static defaultProps = {
    inverse: false,
    large: false,
    disable: false,
    text: 'Big button',
    color: colors.primary,
    onPress: () => {},
  };

  render() {
    const { inverse, text, disable, large, color, onPress, style } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={disable ? 1 : constants.activeOpacity}
        onPress={() => (disable ? {} : onPress())}
        style={[
          {
            width: width * (large ? 0.9 : 0.43),
            justifyContent: 'center',
            alignItems: 'center',
            height: constants.buttonHeight,
            borderRadius: constants.borderRadius,
            backgroundColor: disable || inverse ? colors.white : color,
            borderColor: disable ? colors.disabled : color,
            borderWidth: 2,
          },
          style,
        ]}
      >
        <Text
          style={{
            color: disable ? colors.disabled : inverse ? color : colors.white,
            fontWeight: 'bold',
            fontSize: 18,
          }}
        >
          {text}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default Button;
