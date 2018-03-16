// @flow
import React from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
  vertical?: boolean,
  size?: number | string,
  style?: Object,
};

const Divider = ({ vertical, size, style }: Props) => {
  return (
    <View
      style={[
        {
          width: vertical ? 1.5 : size,
          height: vertical ? size : 1.5,
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
  size: '90%',
};

export default Divider;
