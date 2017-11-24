// @flow
import React from 'react';
import { ScrollView } from 'react-native';
import ListElement from '../ListElement';

import type { ListItem } from '../ListElement';

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
            type="radio"
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

export default SingleOptionList;
