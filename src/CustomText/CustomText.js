/*
 * Copyright (c) 2016, University of Oslo, Norway All rights reserved.
 *
 * This file is part of "UiO Software Information Inventory".
 *
 * "UiO Software Information Inventory" is free software: you can redistribute it and/or modify it under the terms of
 * the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at
 * your option) any later version.
 *
 * "UiO Software Information Inventory" is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public
 * License for more details.
 *
 * You should have received a copy of the GNU General Public License along with "UiO Software Information Inventory". If
 * not, see <http://www.gnu.org/licenses/>
 *
 * @flow
 *
 */

import * as React from 'react';
import { Text as RNText } from 'react-native';

// Flow-types from: https://github.com/facebook/react-native/blob/master/Libraries/Text/TextProps.js
type PressRetentionOffset = {
  top: number,
  left: number,
  bottom: number,
  right: number,
};

type TextProps = {|
  accessible?: boolean,
  allowFontScaling?: boolean,
  children: React.Node,
  ellipsizeMode?: 'clip' | 'head' | 'middle' | 'tail',
  nativeID?: string,
  numberOfLines?: number,
  onLayout?: ?(event: Object) => void,
  onLongPress?: ?() => void,
  onPress?: ?() => void,
  pressRetentionOffset?: PressRetentionOffset,
  selectable?: boolean,
  style?: any,
  testID?: string,

  // Android Only
  disabled?: boolean,
  selectionColor?: string,
  textBreakStrategy?: 'balanced' | 'highQuality' | 'simple',

  // iOS Only
  adjustsFontSizeToFit?: boolean,
  minimumFontScale?: number,
  suppressHighlighting?: boolean,
|};

const CustomText = (props: TextProps) => {
  return <RNText allowFontScaling={false} {...props} />;
};

export default CustomText;
