// @flow
import React from 'react';
import { View, Dimensions, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors, constants } from '../styles';

const { width } = Dimensions.get('window');

type Props = {
  inverse?: boolean,
  text: string,
  color?: string,
  onPress: () => void,
  style?: Object,
};

class ListElement extends React.Component<Props> {
  static defaultProps = {
    inverse: false,
    text: 'Big button',
    color: colors.selected,
  };

  render() {
    const { text, color, onPress, style } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={constants.activeOpacity}
        onPress={() => onPress()}
        style={[
          {
            marginBottom: 10,
            width: width * 0.9,
            height: constants.buttonHeight,
            borderRadius: constants.borderRadius,
            backgroundColor: colors.selected,
          },
          style && style,
        ]}
      >
        <View style={{ flexDirection: 'row' }}>
          <Icon name="add" />
          <Text
            style={{
              fontWeight: '500',
              fontSize: 18,
            }}
          >
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default ListElement;
