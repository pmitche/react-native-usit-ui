// @flow
import React from 'react';
import { View } from 'react-native';
import CustomText from '../CustomText';

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
    <CustomText style={{ fontSize: 19, fontWeight: '300' }}>{value}</CustomText>
  </View>
);

export default StepperValue;
