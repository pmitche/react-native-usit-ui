// @flow
import React from 'react';
import {
  View,
  Dimensions,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { colors, constants } from '../styles';

const { height, width } = Dimensions.get('window');
const midValue = width / height;
const rowHeight = height * 0.08;

export type ListItem = {
  id: string,
  text: string,
  subText?: string,
};

type Props = {
  item: ListItem,
  selected: boolean,
  onPress: () => void,
  type: 'single' | 'multiple',
  icons?: { checked: React.Component<*>, unchecked: React.Component<*> },
  color: ?string,
};

class ListElement extends React.Component<Props> {
  static defaultProps = {
    color: colors.primary,
  };

  shouldComponentUpdate(nextProps: Props) {
    return this.props.selected !== nextProps.selected;
  }

  renderIcons() {
    if (this.props.icons) {
      if (this.props.selected) {
        return this.props.icons.checked;
      } else {
        return this.props.icons.unchecked;
      }
    } else {
      if (this.props.selected) {
        if (this.props.type === 'single') {
          return defaultIcons.radio.checked;
        } else if (this.props.type === 'multiple') {
          return defaultIcons.checkbox.checked;
        }
      } else {
        if (this.props.type === 'single') {
          return defaultIcons.radio.unchecked;
        } else if (this.props.type === 'multiple') {
          return defaultIcons.checkbox.unchecked;
        }
      }
    }
  }

  render() {
    const { color, item, selected, onPress } = this.props;
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
          <View style={styles.iconContainer}>{this.renderIcons()}</View>
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
  image: {
    height: midValue * 36,
    width: midValue * 36,
  },
  text: {
    height: rowHeight,
    width: width * 0.75,
    justifyContent: 'center',
  },
});

const defaultIcons = {
  checkbox: {
    checked: (
      <Image source={require('./checkedbox.png')} style={styles.image} />
    ),
    unchecked: (
      <Image source={require('./uncheckedbox.png')} style={styles.image} />
    ),
  },
  radio: {
    checked: (
      <Image source={require('./radiochecked.png')} style={styles.image} />
    ),
    unchecked: (
      <Image source={require('./radiounchecked.png')} style={styles.image} />
    ),
  },
};

export default ListElement;
