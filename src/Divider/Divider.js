// @flow
import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

type Props = {
  vertical?: boolean,
  height?: number | string,
  style?: Object,
};

const Divider = ({ vertical, height, style }: Props) => {
  return (
    <View
      style={[
        {
          width: vertical ? 1.5 : width * 0.9,
          height: vertical ? height : 1.5,
          marginVertical: vertical ? 0 : 15,
          marginHorizontal: vertical ? 15 : 0,
          backgroundColor: '#B6B6B6',
        },
        StyleSheet.flatten(style),
      ]}
    />
  );
};

Divider.defaultProps = {
  height: '100%',
};

export default Divider;
