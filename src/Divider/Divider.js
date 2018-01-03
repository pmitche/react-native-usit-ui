// @flow
import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

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
      StyleSheet.flatten(style),
    ]}
  />
);

export default Divider;
