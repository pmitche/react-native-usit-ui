// @flow
import React from 'react';
import { Image, ScrollView } from 'react-native';
import ListElement from '../ListElement';
import { midValue } from '../styles/constants';

import type { ListItem } from '../ListElement/ListElement';

const defaultIcons = {
  checked: (
    <Image
      source={require('./checkedbox.png')}
      style={{ height: midValue * 36, width: midValue * 36 }}
    />
  ),
  unchecked: (
    <Image
      source={require('./uncheckedbox.png')}
      style={{ height: midValue * 36, width: midValue * 36 }}
    />
  ),
};

type Props = {
  items: Array<ListItem>,
  onChange: (result: Array<string | number>) => void,
  color?: string,
  icons?: { checked: React.Component<*>, unchecked: React.Component<*> },
};

type State = {
  selected: Array<number | string>,
};

class MultipleOptionList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selected: [],
    };
  }

  onSelect(id: number | string) {
    const updatedSelected = this.state.selected.includes(id)
      ? this.state.selected.filter(value => value !== id)
      : [...this.state.selected, id];

    this.setState({ selected: updatedSelected });
    this.props.onChange(updatedSelected);
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
            icons={icons ? icons : defaultIcons}
            color={color}
            selected={this.state.selected.includes(element.id)}
            onPress={() => this.onSelect(element.id)}
          />
        ))}
      </ScrollView>
    );
  }
}

export default MultipleOptionList;
