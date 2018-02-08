import React from 'react';

import Svg, { G, Rect, Path } from 'react-native-svg';
import { colors } from '../styles';

const UncheckedBox = (p: { color?: string, disabled: boolean }) => (
  <Svg height="21" width="21" viewBox="0 0 21 21">
    <G
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
      fillOpacity={p.disabled ? '0.4' : '1'}
    >
      <G fill={p.color || colors.primary}>
        <Path d="M3,0 L18,0 C19.6568542,-3.04359188e-16 21,1.34314575 21,3 L21,18 C21,19.6568542 19.6568542,21 18,21 L3,21 C1.34314575,21 2.02906125e-16,19.6568542 0,18 L0,3 C-2.02906125e-16,1.34314575 1.34314575,3.04359188e-16 3,0 Z M3.33333333,2.33333333 C2.78104858,2.33333333 2.33333333,2.78104858 2.33333333,3.33333333 L2.33333333,17.6666667 C2.33333333,18.2189514 2.78104858,18.6666667 3.33333333,18.6666667 L17.6666667,18.6666667 C18.2189514,18.6666667 18.6666667,18.2189514 18.6666667,17.6666667 L18.6666667,3.33333333 C18.6666667,2.78104858 18.2189514,2.33333333 17.6666667,2.33333333 L3.33333333,2.33333333 Z" />
      </G>
    </G>
  </Svg>
);

export default UncheckedBox;
