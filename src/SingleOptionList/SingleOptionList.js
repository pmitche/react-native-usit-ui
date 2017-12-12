// @flow
import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import ListElement from '../ListElement';
import { midValue } from '../styles/constants';

import type { ListItem } from '../ListElement/ListElement';

type Props = {
  items: Array<ListItem>,
  onChange: (id: number | string) => void,
  color?: string,
  icons?: {
    checked: (color: string) => React.Component<*>,
    unchecked: (color: string) => React.Component<*>,
  },
  defaultSelected?: number | string,
};

type States = {
  selected: ?(number | string),
};

class SingleOptionList extends React.Component<Props, States> {
  static defaultProps = {
    icons: {
      checked: (color: string) => ImageIcon(color, 'checked'),
      unchecked: (color: string) => ImageIcon(color, 'unchecked'),
    },
    onChange: () => {},
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      selected: props.defaultSelected,
    };
  }

  onSelect(id: number | string) {
    this.setState({ selected: id });
    this.props.onChange(id);
  }

  render() {
    const { color, icons, items } = this.props;

    return (
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {items.map(element => (
          <ListElement
            key={element.id}
            item={element}
            icons={icons}
            color={color}
            selected={this.state.selected === element.id}
            onPress={() => this.onSelect(element.id)}
          />
        ))}
      </ScrollView>
    );
  }
}

const ImageIcon = (color: string, type: 'checked' | 'unchecked') => (
  <View style={{ borderRadius: midValue * 36 / 2, backgroundColor: 'white' }}>
    <Image
      source={
        type === 'checked'
          ? require('./radiochecked.png')
          : require('./radiounchecked.png')
      }
      style={{
        height: midValue * 36,
        width: midValue * 36,
        tintColor: color,
      }}
    />
  </View>
);

export default SingleOptionList;
