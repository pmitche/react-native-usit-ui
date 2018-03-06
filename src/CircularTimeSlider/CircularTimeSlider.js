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
import React, { Component } from 'react';
import { PanResponder } from 'react-native';
import Svg, {
  Circle,
  G,
  LinearGradient,
  Path,
  Defs,
  Stop,
  Text,
} from 'react-native-svg';
import { interpolateHcl as interpolateGradient } from 'd3-interpolate';
import { range } from 'lodash';

type Quarters = 'FIRST' | 'SECOND' | 'THIRD' | 'FOURTH';

// This is a time unit component. If someone want to make a generic
// slider for other numeric values, this can be added as prop and set the
// values in the <Text/> component respectively
const INTERVAL = 60;

type CircularSliderProps = {
  hourUnit: string,
  minuteUnit: string,
  segments: number,
  radius: number,
  strokeWidth: number,
  buttonColor: string,
  buttonBorderColor: string,
  buttonBorderWidth: string,
  gradientColorFrom: string,
  gradientColorTo: string,
  bgCircleColor: string,
  onValueChange: (value: number) => void,
  onRelease?: (value: number) => void,
};

type CircularSliderState = {
  angleLengthInRadian: number,
  circleCenterX: ?number,
  circleCenterY: ?number,
  rotations: number,
  quarter: Quarters,
};

class CircularSlider extends React.Component<
  CircularSliderProps,
  CircularSliderState,
> {
  circle: any;
  buttonPanResponder: any;

  static defaultProps = {
    hourUnit: 't',
    minuteUnit: 'minutter',
    segments: 10,
    radius: 120,
    strokeWidth: 25,
    buttonColor: 'white',
    buttonBorderWidth: '4',
    buttonBorderColor: '#197AA3',
    gradientColorFrom: '#3023AE',
    gradientColorTo: '#8f42f4',
    bgCircleColor: '#E9F2F5',
    onValueChange: () => {},
  };

  constructor() {
    super();
    this.state = {
      angleLengthInRadian: 0,
      circleCenterX: undefined,
      circleCenterY: undefined,
      rotations: 0,
      quarter: 'FIRST',
    };
  }

  componentWillMount() {
    this.buttonPanResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderRelease: () => {
        const { convertToMinute, totalMinutes } = calculateTotalMinutes(
          this.state.angleLengthInRadian,
          this.state.rotations,
        );

        this.props.onRelease && this.props.onRelease(totalMinutes);
      },
      onPanResponderGrant: (evt, gestureState) => this.setCircleCenter(),
      onPanResponderMove: (evt, { moveX, moveY }) => {
        const {
          circleCenterX,
          circleCenterY,
          angleLengthInRadian,
          quarter,
          rotations,
        } = this.state;

        if (circleCenterX && circleCenterY) {
          let newAngle =
            Math.atan2(moveY - circleCenterY, moveX - circleCenterX) +
            Math.PI / 2;

          /* At newAngle [3/2*Math.PI, 2*Math.PI] you get negative values
            * so to counteract this we multiply add it with 2*Math.PI
            * subtract 0.05 to skip the value indicating 2PI, because we
            * dont want to display 60minute but rather 0minute 
          */
          if (newAngle < 0) {
            newAngle += 2 * Math.PI - 0.05;
          }

          const currentQuarter: Quarters = determineQuarter(newAngle);
          const validMovement = validateRotation(
            rotations,
            quarter,
            currentQuarter,
          );

          if (validMovement) {
            this.setState({
              angleLengthInRadian: newAngle,
              quarter: currentQuarter,
              rotations: calculateRotations(quarter, currentQuarter, rotations),
            });
          }
        }
      },
    });
  }

  setCircleCenter = () => {
    this.circle.measure((x, y, w, h, px, py) => {
      const halfOfContainer = this.getContainerWidth() / 2;
      this.setState({
        circleCenterX: px + halfOfContainer,
        circleCenterY: py + halfOfContainer,
      });
    });
  };

  getContainerWidth() {
    const { strokeWidth, radius } = this.props;
    return strokeWidth + radius * 2 + 2;
  }

  render() {
    const {
      hourUnit,
      minuteUnit,
      segments,
      strokeWidth,
      radius,
      buttonColor,
      buttonBorderColor,
      buttonBorderWidth,
      gradientColorFrom,
      gradientColorTo,
      bgCircleColor,
      onValueChange,
    } = this.props;

    const { angleLengthInRadian, rotations } = this.state;

    const containerWidth = this.getContainerWidth();
    const stopButtonPosition = calculateArcCircle(
      segments - 1,
      segments,
      radius,
      angleLengthInRadian,
    );

    const { convertToMinute, totalMinutes } = calculateTotalMinutes(
      angleLengthInRadian,
      rotations,
    );
    onValueChange(totalMinutes);

    return (
      <Svg
        viewBox={`0 -15 ${containerWidth} ${containerWidth + 30}`}
        height={containerWidth}
        width={containerWidth}
        ref={circle => (this.circle = circle)}
      >
        <Defs>
          {range(segments).map(i => {
            const { fromX, fromY, toX, toY } = calculateArcCircle(
              i,
              segments,
              radius,
              angleLengthInRadian,
            );
            const { fromColor, toColor } = calculateArcColor(
              i,
              segments,
              gradientColorFrom,
              gradientColorTo,
            );

            return (
              <LinearGradient
                key={i}
                id={getGradientId(i)}
                x1={0}
                y1={radius * -1}
                x2={toX.toFixed(2)}
                y2={toY.toFixed(2)}
              >
                <Stop offset="0%" stopColor={fromColor} />
                <Stop offset="1" stopColor={toColor} />
              </LinearGradient>
            );
          })}
        </Defs>

        {/*
              ##### Circle
            */}

        <G
          transform={{
            translate: `${strokeWidth / 2 + radius + 1}, ${strokeWidth / 2 +
              radius +
              1}`,
          }}
        >
          <Circle
            r={radius}
            strokeWidth={strokeWidth}
            fill="transparent"
            stroke={bgCircleColor}
          />

          <Text fontSize="50" textAnchor="middle" fontWeight="300" y="-50">
            {rotations ? `${rotations}${hourUnit} ` : undefined}
            {convertToMinute.toFixed(0)}
          </Text>
          <Text fontSize="30" textAnchor="middle" fontWeight="300" y="10">
            {minuteUnit}
          </Text>

          {range(segments).map(i => {
            const { fromX, fromY, toX, toY } = calculateArcCircle(
              i,
              segments,
              radius,
              angleLengthInRadian,
            );
            const d = `M ${fromX.toFixed(2)} ${fromY.toFixed(2)} A ${radius} ${
              radius
            } 0 0 1 ${toX.toFixed(2)} ${toY.toFixed(2)}`;

            return (
              <Path
                d={d}
                key={i}
                strokeWidth={strokeWidth}
                stroke={`url(#${getGradientId(i)})`}
                fill="transparent"
              />
            );
          })}
          {/*
                ##### Button
              */}
          <G
            fill={gradientColorTo}
            transform={{
              translate: `${stopButtonPosition.toX}, ${stopButtonPosition.toY}`,
            }}
            {...this.buttonPanResponder.panHandlers}
          >
            <Circle
              r={strokeWidth * 0.9}
              fill={buttonColor}
              stroke={buttonBorderColor}
              strokeWidth={buttonBorderWidth}
            />
          </G>
        </G>
      </Svg>
    );
  }
}

function calculateTotalMinutes(angleLength: number, rotations: number) {
  const convertToMinute = angleLength * (INTERVAL / (2 * Math.PI));
  const totalMinutes = Math.round(convertToMinute + INTERVAL * rotations);
  return { convertToMinute, totalMinutes };
}

function validateRotation(
  rotations: number,
  quarter: Quarters,
  currentQuarter: Quarters,
) {
  const hasPassedFirstRotation = rotations > 0;
  const nextPositionIsNotFourthQuarter = !(
    quarter === 'FIRST' && currentQuarter === 'FOURTH'
  );
  const positionIsInTheSameQuarter = quarter === currentQuarter;

  return (
    hasPassedFirstRotation ||
    nextPositionIsNotFourthQuarter ||
    positionIsInTheSameQuarter
  );
}

function getGradientId(index) {
  return `gradient${index}`;
}

function calculateRotations(
  quarter: Quarters,
  currentQuarter: Quarters,
  rotations: number,
): number {
  if (quarter === 'FOURTH' && currentQuarter === 'FIRST') {
    return rotations + 1;
  } else if (quarter === 'FIRST' && currentQuarter === 'FOURTH') {
    return rotations - 1;
  } else {
    return rotations;
  }
}

function determineQuarter(x: number): Quarters {
  if (x >= 0 && x < 0.5 * Math.PI) {
    return 'FIRST';
  } else if (x >= 0.5 * Math.PI && x < Math.PI) {
    return 'SECOND';
  } else if (x >= Math.PI && x < 1.5 * Math.PI) {
    return 'THIRD';
  } else {
    return 'FOURTH';
  }
}

function calculateArcColor(
  index0: number,
  segments: number,
  gradientColorFrom: string,
  gradientColorTo: string,
) {
  const interpolate = interpolateGradient(gradientColorFrom, gradientColorTo);

  return {
    fromColor: interpolate(index0 / segments),
    toColor: interpolate((index0 + 1) / segments),
  };
}

function calculateArcCircle(index0, segments, radius, angleLength0 = 0) {
  // Add 0.0001 to the possible angle so when start = stop angle, whole circle is drawn
  const angleLengthInRadian = angleLength0;

  const index = index0 + 1;
  const fromAngle = angleLengthInRadian / segments * (index - 1);
  const toAngle = angleLengthInRadian / segments * index;
  const fromX = radius * Math.sin(fromAngle);
  const fromY = -radius * Math.cos(fromAngle);
  const realToX = radius * Math.sin(toAngle);
  const realToY = -radius * Math.cos(toAngle);

  // add 0.005 to start drawing a little bit earlier so segments stick together
  const toX = radius * Math.sin(toAngle + 0.005);
  const toY = -radius * Math.cos(toAngle + 0.005);

  return {
    fromX,
    fromY,
    toX,
    toY,
    realToX,
    realToY,
  };
}

export default CircularSlider;
