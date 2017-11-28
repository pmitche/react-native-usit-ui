// @flow
import React from 'react';
import { Dimensions, Text, TouchableOpacity } from 'react-native';

import { colors, constants } from '../styles';

const { width } = Dimensions.get('window');

type Props = {
  inverse?: boolean,
  large?: boolean,
  text: string,
  color?: string,
  onPress: () => void,
  style?: Object,
};

class Button extends React.Component<Props> {
  static defaultProps = {
    inverse: false,
    large: false,
    text: 'Big button',
    color: colors.primary,
  };

  render() {
    const { inverse, text, large, color, onPress, style } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={constants.activeOpacity}
        onPress={() => onPress()}
        style={[
          {
            width: width * (large ? 0.9 : 0.43),
            justifyContent: 'center',
            alignItems: 'center',
            height: constants.buttonHeight,
            borderRadius: constants.borderRadius,
            backgroundColor: inverse ? colors.white : color,
            borderColor: color,
            borderWidth: 2,
          },
          style && style,
        ]}
      >
        <Text
          style={{
            color: inverse ? color : colors.white,
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
