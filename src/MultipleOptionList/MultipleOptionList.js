// @flow
import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import ListElement from '../ListElement';
import { midValue } from '../styles/constants';

import type { ListItem } from '../ListElement/ListElement';

type Props = {
  items: Array<ListItem>,
  maxOptions: ?number,
  onChange: (result: Array<string | number>) => void,
  color?: string,
  icons?: {
    checked: (color: string) => React.Component<*>,
    unchecked: (color: string) => React.Component<*>,
  },
};

type State = {
  selected: Array<number | string>,
};

class MultipleOptionList extends React.Component<Props, State> {
  static defaultProps = {
    maxOptions: undefined,
    icons: {
      checked: (color: string) => ImageIcon(color, 'checked'),
      unchecked: (color: string) => ImageIcon(color, 'unchecked'),
    },
    onChange: () => {},
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      selected: [],
    };
  }

  onSelect(id: number | string) {
    const updatedSelected = this.isSelected(id)
      ? this.state.selected.filter(value => value !== id)
      : [...this.state.selected, id];

    this.setState({ selected: updatedSelected });
    this.props.onChange(updatedSelected);
  }

  isMaxOptionsSelected = (): boolean =>
    this.props.maxOptions === this.state.selected.length;

  isSelected = (id: number | string): boolean =>
    this.state.selected.includes(id);

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
            disabled={
              this.isMaxOptionsSelected() && !this.isSelected(element.id)
            }
            selected={this.isSelected(element.id)}
            onPress={() => this.onSelect(element.id)}
          />
        ))}
      </ScrollView>
    );
  }
}

const ImageIcon = (color: string, type: 'checked' | 'unchecked') => (
  <View style={{ borderRadius: 5, backgroundColor: 'white' }}>
    <Image
      source={
        type === 'checked'
          ? require('./checkedbox.png')
          : require('./uncheckedbox.png')
      }
      style={{
        height: midValue * 36,
        width: midValue * 36,
        tintColor: color,
      }}
    />
  </View>
);

export default MultipleOptionList;
