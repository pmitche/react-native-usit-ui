// @flow
import React from 'react';
import { ScrollView } from 'react-native';
import ListElement from '../ListElement';

type Props = {
  selected: Array<number>,
  items: Array<Object>,
  onChange: (result: Array<any>) => void,
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

  onMultipleItem(id: number) {
    if (this.state.multiple.includes(id)) {
      this.setState({
        multiple: this.state.multiple.filter(value => value !== id),
      });
    } else {
      this.setState({ multiple: [...this.state.multiple, id] });
    }
  }
  render() {
    return (
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {this.props.items.map(item => (
          <ListElement key={item.id} text={item.text} subText={item.subText} />
        ))}
      </ScrollView>
    );
  }
}

export default MultipleOptionList;
