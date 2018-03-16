// @flow

import * as React from 'react';
import { View } from 'react-native'
import { GradientBackground, Button } from 'react-native-usit-ui';

class GradientBackgroundExample extends React.Component<{}> {
  render() {
    return (
      <View style={{
        height: 400,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <GradientBackground
          fromColor="#b8cef2"
          toColor="#40a4f9"
          direction="topToBottom"
        />
        <Button />
      </View>
    );
  }
}

export default GradientBackgroundExample;
