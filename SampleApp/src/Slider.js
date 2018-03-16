// @flow

import * as React from 'react';
import { View } from 'react-native';
import { Slider } from 'react-native-usit-ui';

class SliderExample extends React.Component<{}> {
  render() {
    return (
      <View
        style={{
          height: 500,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Slider max={10} />
        <Slider max={5} color="red" labels={['Bad', 'Good']} />
        <Slider max={100} color="red" labels={['Bad', 'Good']} />
        <Slider
          max={100}
          animate={false}
          color="red"
          labels={['Bad', 'Good']}
        />
        <Slider size={200} vertical />
        <View style={{ height: 50 }} />
      </View>
    );
  }
}

export default SliderExample;
