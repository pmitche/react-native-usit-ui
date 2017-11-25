// @flow
import React from 'react';
import { Image, ScrollView } from 'react-native';
import ListElement from '../ListElement';
import { midValue } from '../styles/constants';

import type { ListItem } from '../ListElement/ListElement';

const defaultIcons = {
  checked: (
    <Image
      source={require('./radiochecked.png')}
      style={{ height: midValue * 36, width: midValue * 36 }}
    />
  ),
  unchecked: (
    <Image
      source={require('./radiounchecked.png')}
      style={{ height: midValue * 36, width: midValue * 36 }}
    />
  ),
};

type Props = {
  items: Array<ListItem>,
  onChange: (id: number | string) => void,
  color?: string,
  icons?: { checked: React.Component<*>, unchecked: React.Component<*> },
};

type States = {
  selected: ?(number | string),
};

class SingleOptionList extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selected: undefined,
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
            icons={icons ? icons : defaultIcons}
            color={color}
            selected={this.state.selected === element.id}
            onPress={() => this.onSelect(element.id)}
          />
        ))}
      </ScrollView>
    );
  }
}

export default SingleOptionList;
