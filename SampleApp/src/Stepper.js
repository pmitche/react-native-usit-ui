// @flow

import * as React from 'react';
import { View } from 'react-native';
import { Stepper } from 'react-native-usit-ui';

class StepperExample extends React.Component<{}> {
  render() {
    return (
      <React.Fragment>
        <Stepper onChange={value => console.log(value)} />
        <View style={{ margin: 5 }} />
        <Stepper maxValue={20} initialValue={12} color="#6443e8" />
      </React.Fragment>
    );
  }
}

export default StepperExample;
