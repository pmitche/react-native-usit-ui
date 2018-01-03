// @flow
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { colors, constants } from '../styles';

const { width } = Dimensions.get('window');

type Props = {
  inverse: boolean,
  large: boolean,
  text: string,
  disabled: boolean,
  color: string,
  onPress: () => void,
  style?: Object,
  textStyle?: Object,
};

class Button extends React.Component<Props> {
  static defaultProps = {
    inverse: false,
    large: false,
    disabled: false,
    text: 'Big button',
    color: colors.primary,
    onPress: () => {},
  };

  render() {
    const {
      inverse,
      text,
      disabled,
      large,
      color,
      onPress,
      style,
      textStyle,
    } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={disabled ? 1 : constants.activeOpacity}
        onPress={() => (disabled ? {} : onPress())}
        style={[
          {
            width: width * (large ? 0.9 : 0.43),
            justifyContent: 'center',
            alignItems: 'center',
            height: constants.buttonHeight,
            borderRadius: constants.borderRadius,
            backgroundColor: disabled || inverse ? colors.white : color,
            borderColor: disabled ? colors.disabled : color,
            borderWidth: 2,
          },
          StyleSheet.flatten(style),
        ]}
      >
        <Text
          style={[
            {
              color: disabled
                ? colors.disabled
                : inverse ? color : colors.white,
              fontWeight: 'bold',
              fontSize: 18,
            },
            StyleSheet.flatten(textStyle),
          ]}
        >
          {text}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default Button;
