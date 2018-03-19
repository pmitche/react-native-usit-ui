// @flow

import * as React from 'react';
import { View } from 'react-native'
import { Divider, Button } from 'react-native-usit-ui';

class DividerExample extends React.Component<{}> {
  render() {
    return (
      <React.Fragment>
        <Button />
        <Divider />
        <View style={{ flexDirection: 'row' }}>
          <Button />
          <Divider vertical />
          <Button />
        </View>
      </React.Fragment>
    );
  }
}

export default DividerExample;
