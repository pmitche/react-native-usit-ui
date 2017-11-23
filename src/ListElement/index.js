// @flow
import React from 'react';
import { View, Dimensions, Text, Image, TouchableOpacity } from 'react-native';

import { colors, constants } from '../styles';

const { height, width } = Dimensions.get('window');
const midValue = width / height;

type Props = {
  text: string,
  selected: boolean,
  subText?: string,
  icons?: { checked: string, unchecked: string },
  onPress: () => void,
};

const defaultIcons = {
  checked: require('./checkedbox.png'),
  unchecked: require('./uncheckedbox.png'),
};

const rowHeight = height * 0.08;

class ListElement extends React.Component<Props> {
  static defaultProps = {
    icons: defaultIcons,
  };

  shouldComponentUpdate(nextProps: Props) {
    return this.props.selected !== nextProps.selected;
  }

  render() {
    const { text, icons, selected, subText, onPress } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={constants.activeOpacity}
        onPress={() => onPress()}
        style={[
          {
            marginBottom: 12,
            width: width * 0.9,
            height: subText ? undefined : rowHeight,
            borderRadius: constants.borderRadius,
            backgroundColor: selected ? colors.selected : colors.unselected,
          },
        ]}
      >
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View
            style={{
              height: rowHeight,
              width: width * 0.14,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              source={selected ? icons.checked : icons.unchecked}
              style={{ height: midValue * 36, width: midValue * 36 }}
            />
          </View>
          <View
            style={{
              height: rowHeight,
              width: width * 0.75,
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontSize: midValue * 36,
              }}
            >
              {text}
            </Text>
          </View>
        </View>
        {subText && (
          <View style={{ flexDirection: 'row', marginBottom: 18 }}>
            <View style={{ flex: 0.157 }} />
            <View style={{ flex: 0.83 }}>
              <Text style={{ fontSize: midValue * 27 }}>{subText}</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  }
}

export default ListElement;
