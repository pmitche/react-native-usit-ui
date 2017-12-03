// @flow
import React from 'react';
import { View, Text } from 'react-native';

const StepperValue = ({ value, color }: { value: number, color: string }) => (
  <View
    style={{
      flex: 5 / 11,
      justifyContent: 'center',
      alignItems: 'center',
      borderLeftWidth: 2,
      borderRightWidth: 2,
      borderColor: color,
    }}
  >
    <Text style={{ fontSize: 19, fontWeight: '300' }}>{value}</Text>
  </View>
);

export default StepperValue;
