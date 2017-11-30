// @flow
import React from 'react';
import { View, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const Divider = ({ style }: { style?: Object }) => (
  <View
    style={[
      {
        width: width * 0.9,
        height: 1.5,
        marginVertical: 15,
        backgroundColor: '#B6B6B6',
      },
      style && style,
    ]}
  />
);

export default Divider;
