// @flow

import * as React from 'react';
import { Dimensions, View } from 'react-native';
import { Button } from 'react-native-usit-ui';

const { width } = Dimensions.get('window');

class ButtonExample extends React.Component<{}> {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <Button large />
        <View height={10} />
        <Button large inverse />
        <View height={10} />
        <Button disabled />
        <View height={10} />
        <Button disabled large />
        <View height={10} />
        <View
          style={{
            flexDirection: 'row',
            width: width * 0.9,
            justifyContent: 'space-between',
          }}
        >
          <Button text="Yes" />
          <Button text="No" inverse />
        </View>
      </View>
    );
  }
}

export default ButtonExample;
