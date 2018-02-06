import React from 'react';

import Svg, { G, Path } from 'react-native-svg';
import { colors } from '../styles';

const CheckedBox = (p: { color?: string }) => (
  <Svg height="21" width="21" viewBox="0 0 21 21">
    <G stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <G fill={p.color || colors.primary}>
        <Path d="M3,0 L18,0 C19.6568542,-3.04359188e-16 21,1.34314575 21,3 L21,18 C21,19.6568542 19.6568542,21 18,21 L3,21 C1.34314575,21 2.02906125e-16,19.6568542 0,18 L0,3 C-2.02906125e-16,1.34314575 1.34314575,3.04359188e-16 3,0 Z M3.73175065,11.5119067 L8.39536947,16.1866559 L17.5,7.05976464 L15.1403647,4.70012935 L8.38423911,11.4562549 L6.09138594,9.15227142 L3.73175065,11.5119067 Z" />
      </G>
    </G>
  </Svg>
);

export default CheckedBox;
