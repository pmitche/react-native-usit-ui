// @flow
import React from 'react';
import { View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomText from '../CustomText';
import { colors, constants } from '../styles';

const { width } = Dimensions.get('window');

type Props = {
  text: string,
  onPress: () => void,
  color: string,
  icon?: React.Component<*>,
  setElementsHorizontal: boolean,
  fontSize: number,
  disabled: boolean,
  inverse: boolean,
  textStyle?: Object,
  style?: Object,
};

class MenuButton extends React.Component<Props> {
  static defaultProps = {
    text: 'Menu button',
    onPress: () => {},
    color: colors.primary,
    setElementsHorizontal: false,
    fontSize: 30,
    disabled: false,
    inverse: false,
  };

  render() {
    const {
      disabled,
      inverse,
      text,
      color,
      icon,
      fontSize,
      onPress,
      textStyle,
      style,
      setElementsHorizontal,
    } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={disabled ? 1 : constants.activeOpacity}
        onPress={() => (disabled ? {} : onPress())}
        style={[
          styles.container,
          StyleSheet.flatten(style),
          {
            backgroundColor: disabled || inverse ? colors.white : color,
            borderColor: disabled ? colors.disabled : color,
          },
        ]}
      >
        <View
          style={{
            flexDirection: setElementsHorizontal ? 'row' : undefined,
            alignItems: 'center',
          }}
        >
          <View style={setElementsHorizontal ? styles.rowIcon : undefined}>
            {icon ? (
              icon
            ) : (
              <Icon
                name="person"
                size={50}
                color={
                  disabled ? colors.disabled : inverse ? color : colors.white
                }
              />
            )}
          </View>
          <View style={setElementsHorizontal ? styles.rowText : undefined}>
            <CustomText
              style={[
                {
                  color: disabled
                    ? colors.disabled
                    : inverse ? color : colors.white,
                  fontSize,
                  fontWeight: '500',
                },
                StyleSheet.flatten(textStyle),
              ]}
            >
              {text}
            </CustomText>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width * 0.9,
    justifyContent: 'center',
    borderRadius: constants.borderRadius,
    borderWidth: 2,
    marginBottom: 15,
  },
  rowIcon: {
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowText: {
    flex: 0.75,
    justifyContent: 'center',
  },
});

export default MenuButton;
