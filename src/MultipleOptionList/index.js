// @flow
import React from 'react';
import { ScrollView } from 'react-native';
import ListElement from '../ListElement';
import type { ListItem } from '../ListElement';

type Props = {
  items: Array<ListItem>,
  onChange: (result: Array<string | number>) => void,
  color?: string,
  icons?: { checked: React.Component<*>, unchecked: React.Component<*> },
};

type States = {
  multiple: Array<number | string>,
};

class MultipleOptionList extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      multiple: [],
    };
  }

  onSelect(id: number | string) {
    if (this.state.multiple.includes(id)) {
      const removed = this.state.multiple.filter(value => value !== id);
      this.setState({ multiple: removed });
      this.props.onChange(removed);
    } else {
      const selected = [...this.state.multiple, id];
      this.setState({ multiple: selected });
      this.props.onChange(selected);
    }
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
            type="multiple"
            icons={icons}
            color={color}
            selected={this.state.multiple.includes(element.id)}
            onPress={() => this.onSelect(element.id)}
          />
        ))}
      </ScrollView>
    );
  }
}

export default MultipleOptionList;
