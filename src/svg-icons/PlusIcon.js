// @flow
import React from 'react';
import { View } from 'react-native';
import Svg, { G, Line, Circle } from 'react-native-svg';

const PlusIcon = ({ size }: { size: number }) => {
  const sizeToString = size.toString();
  const halvedSizeString = (size / 2).toString();
  return (
    <Svg
      height={sizeToString}
      width={sizeToString}
      viewBox={`0 0 ${sizeToString} ${sizeToString}`}
    >
      <G>
        <G>
          <Circle
            cx={halvedSizeString}
            cy={halvedSizeString}
            r={(size / 2 - 3).toString()}
            fill="#E5F1F3"
            fillRule="evenodd"
          />
          <Circle
            cx={halvedSizeString}
            cy={halvedSizeString}
            r={(size / 2 - 3).toString()}
            strokeWidth={(0.06 * size).toString()}
            stroke="#1081A3"
            fill="none"
          />
        </G>
        <Line
          x1={halvedSizeString}
          x2={halvedSizeString}
          y1={(0.75 * size).toString()}
          y2={(0.25 * size).toString()}
          strokeLinecap="round"
          stroke="#1081A3"
          strokeWidth={(0.1 * size).toString()}
        />
        <Line
          x1={(0.25 * size).toString()}
          x2={(0.75 * size).toString()}
          y1={halvedSizeString}
          y2={halvedSizeString}
          strokeLinecap="round"
          stroke="#1081A3"
          strokeWidth={(0.1 * size).toString()}
        />
      </G>
    </Svg>
  );
};

export default PlusIcon;
