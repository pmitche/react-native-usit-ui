// @flow
import React from 'react';
import {
  View,
  Dimensions,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, constants } from '../styles';

const { width } = Dimensions.get('window');

type Props = {
  text: string,
  onPress: () => void,
  color?: string,
  icon?: React.Component<*>,
  row?: boolean,
  fontSize?: number,
  disabled?: boolean,
};

class MenuButton extends React.Component<Props> {
  static defaultProps = {
    text: 'Menu button',
    onPress: () => {},
    color: colors.primary,
    row: false,
    fontSize: 30,
    disabled: false,
  };

  render() {
    const { disabled, text, color, icon, fontSize, onPress, row } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={constants.activeOpacity}
        onPress={() => onPress()}
        style={{
          flex: 1,
          width: width * 0.9,
          justifyContent: 'center',
          borderRadius: constants.borderRadius,
          backgroundColor: disabled ? colors.white : color,
          borderColor: color,
          borderWidth: 2,
          marginBottom: 15,
        }}
      >
        <View
          style={{
            flexDirection: row ? 'row' : undefined,
            alignItems: 'center',
          }}
        >
          <View style={row ? styles.rowIcon : undefined}>
            {icon ? (
              icon
            ) : (
              <Icon
                name="person"
                size={50}
                color={disabled ? color : colors.white}
              />
            )}
          </View>
          <View style={row ? styles.rowText : undefined}>
            <Text
              style={{
                color: disabled ? color : colors.white,
                fontSize,
                fontWeight: '500',
              }}
            >
              {text}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
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
