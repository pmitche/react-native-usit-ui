// @flow

import * as React from 'react';
import { ScrollView } from 'react-native';
import { SingleOptionList } from 'react-native-usit-ui';

const data = [
  { id: 'a', text: 'Tellus' },
  { id: 'b', text: 'Mercury' },
  { id: 'c', text: 'Pluto' },
  { id: 'cc', text: 'Pluto is not actually a planet in the solar system.' },
  { id: 'd', text: 'Uranus' },
  {
    id: 'e',
    text: 'Saturn',
    subText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do        eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  { id: 'f', text: 'Jupiter' },
  { id: 'g', text: 'Venus' },
];

class SingleOptionExample extends React.Component<{}> {
  render() {
    return (
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <SingleOptionList
          items={data}
          color="#f4414d" // Note that HEX value is required, due to opacity design
          defaultSelected="c"
          onChange={result => console.log(result)}
        />
      </ScrollView>
    );
  }
}

export default SingleOptionExample;
