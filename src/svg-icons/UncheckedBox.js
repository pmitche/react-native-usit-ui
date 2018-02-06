import React from 'react';

import Svg, { G, Rect } from 'react-native-svg';
import { colors } from '../styles';

const UncheckedBox = (p: { color?: string }) => (
  <Svg height="21" width="21" viewBox="0 0 21 21">
    <G stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <G stroke={p.color || colors.primary} strokeWidth="2">
        <Rect x="1" y="1" width="19" height="19" rx="3" />
      </G>
    </G>
  </Svg>
);

export default UncheckedBox;
