// @flow
import React from 'react';
import {
  View,
  Dimensions,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { colors, constants } from '../styles';

const { height, width } = Dimensions.get('window');
const midValue = width / height;
const rowHeight = height * 0.08;

export type ListItem = {
  id: string | number,
  text: string,
  subText?: string,
};

type Props = {
  item: ListItem,
  selected: boolean,
  onPress: () => void,
  icons: {
    checked: (color: string) => React.Component<*>,
    unchecked: (color: string) => React.Component<*>,
  },
  color: string,
};

class ListElement extends React.Component<Props> {
  static defaultProps = {
    color: colors.primary,
    onPress: () => {},
  };

  shouldComponentUpdate(nextProps: Props) {
    return this.props.selected !== nextProps.selected;
  }

  render() {
    const { color, item, icons, selected, onPress } = this.props;
    // The color design of the rows is based on opacity, so HEX values is used
    const selectedColor = color && `${color}33`;
    const unselectedColor = color && `${color}10`;

    return (
      <TouchableOpacity
        activeOpacity={constants.activeOpacity}
        onPress={() => onPress()}
        style={[
          styles.row,
          {
            height: item.subText ? undefined : rowHeight,
            backgroundColor: selected ? selectedColor : unselectedColor,
          },
        ]}
      >
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.iconContainer}>
            {selected ? icons.checked(color) : icons.unchecked(color)}
          </View>
          <View style={styles.text}>
            <Text
              style={{
                fontSize: midValue * 36,
              }}
            >
              {item.text}
            </Text>
          </View>
        </View>
        {item.subText && (
          <View style={{ flexDirection: 'row', marginBottom: 18 }}>
            <View style={{ flex: 0.157 }} />
            <View style={{ flex: 0.83 }}>
              <Text style={{ fontSize: midValue * 27 }}>{item.subText}</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    marginBottom: 12,
    width: width * 0.9,
    borderRadius: constants.borderRadius,
  },
  iconContainer: {
    height: rowHeight,
    width: width * 0.14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    height: rowHeight,
    width: width * 0.75,
    justifyContent: 'center',
  },
});

export default ListElement;
