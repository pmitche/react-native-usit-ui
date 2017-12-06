// @flow

import React from 'react';
import { PanResponder, StyleSheet, Text, View, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

type SliderProps = {
  onValueChange: number => void,
  size: number,
  min: number,
  max: number,
  value: number,
  vertical: boolean,
  thumbStyle: View.propTypes.style,
  trackStyle: View.propTypes.style,
  markerStyle: {
    backgroundColor: string,
    height: number,
    width: number,
  },
  stepText: string[],
};

type SliderState = {
  value: number,
  measured: boolean,
  thumbSize: number,
  position: number,
};

// See: https://github.com/facebook/flow/issues/4564
type SyntheticTouchEventLike = {
  nativeEvent: {
    locationX: number,
    locationY: number,
  },
};

class Slider extends React.Component<SliderProps, SliderState> {
  static defaultProps = {
    onValueChange: () => {},
    size: width * 0.9,
    min: 0,
    max: 100,
    value: 0,
    vertical: false,
    stepText: undefined,
    markerStyle: {
      width: 10,
      backgroundColor: '#b3b3b3',
      height: 10,
      borderRadius: 10 / 2,
    },
    trackStyle: { backgroundColor: 'black', height: 1 },
    thumbStyle: {
      width: 25,
      height: 25,
      borderRadius: 25 / 2,
      backgroundColor: '#2294A8',
    },
  };

  trackSize: number;
  numberOfSteps: number;
  previousLeft: number;
  trackOffsetX: number;
  trackOffsetY: number;

  panResponder: () => void;
  trackPanResponder: () => void;
  trackContainer: any;
  thumb: any;

  constructor(props: SliderProps) {
    super(props);
    const thumbSize = this.props.thumbStyle.width;

    this.state = {
      value: this.props.value,
      position: 0,
      measured: false,
      thumbSize,
    };

    this.trackSize = this.props.size - thumbSize;
    this.numberOfSteps = this.props.max - this.props.min;
    this.previousLeft = 0;
    this.trackOffsetX = -1;
    this.trackOffsetY = -1;
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {},
      onPanResponderMove: (e, gestureState) => this.handleMove(e, gestureState),
      onPanResponderRelease: (e, gestureState) =>
        this.handlePanResponderEnd(e, gestureState),
      onPanResponderTerminate: (e, gestureState) =>
        this.handlePanResponderEnd(e, gestureState),
    });

    this.trackPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: e => this.handleTrackTap(e),
      onPanResponderMove: (e, gestureState) => this.handleMove(e, gestureState),
      onPanResponderRelease: () => this.handleTrackRelease(),
      onPanResponderTerminate: () => this.handleTrackRelease(),
    });
    this.previousLeft = 0;
  }

  componentDidMount() {
    setTimeout(this.measureHelper);
  }

  measureHelper = () => {
    this.trackContainer.measure((fxT, fyT, trackWidth, trackHeight, px, py) => {
      this.trackOffsetX = px;
      this.trackOffsetY = py;
      this.setState({ measured: true });
      this.convertValueToPosition(this.props.value);
    });
  };

  handleTrackRelease() {
    this.props.onValueChange(this.state.value);
  }

  handleTrackTap(e: SyntheticTouchEventLike) {
    const sizeOfTrack = this.trackSize;
    const relativeTouchPosition = e.nativeEvent.locationX;

    const result = Math.round(
      relativeTouchPosition / sizeOfTrack * this.numberOfSteps,
    );
    const relativeThumbPosition = result / this.numberOfSteps * sizeOfTrack;

    const rangeOfTrack =
      relativeTouchPosition / sizeOfTrack * this.numberOfSteps;

    let position;
    let value;

    if (rangeOfTrack < 0) {
      this.previousLeft = 0;
      position = 0;
      value = this.props.min;
    } else if (rangeOfTrack > this.numberOfSteps) {
      this.previousLeft = sizeOfTrack;
      position = sizeOfTrack;
      value = this.props.max;
    } else {
      this.previousLeft = relativeThumbPosition;
      position = relativeThumbPosition;
      value = result + this.props.min;
    }
    this.setState({ position, value });
  }

  handlePanResponderEnd(e: SyntheticTouchEventLike, gestureState: Object) {
    if (this.props.vertical) {
      this.previousLeft -= gestureState.dy;
    } else {
      this.previousLeft += gestureState.dx;
    }
    if (this.previousLeft < 0) this.previousLeft = 0;
    if (this.previousLeft > this.trackSize) this.previousLeft = this.trackSize;

    this.props.onValueChange(this.state.value);
  }

  handleMove(e: SyntheticTouchEventLike, gestureState: Object) {
    let position;
    if (this.props.vertical) {
      position = this.previousLeft - gestureState.dy;
    } else {
      position = this.previousLeft + gestureState.dx;
    }

    if (position < -1) position = 0;
    if (position > this.trackSize + 1) position = this.trackSize;

    this.convertValue(position);
  }

  convertValue(pos: number) {
    if (pos > this.trackSize + 1) pos = this.trackSize;
    const value = Math.round(pos / this.trackSize * this.numberOfSteps);
    const position = value / this.numberOfSteps * this.trackSize;
    this.setState({ position, value: value + this.props.min });
  }

  convertValueToPosition(value: number) {
    const roundedValue = Math.round(value);
    const position = value / this.numberOfSteps * this.trackSize;
    this.previousLeft = position;
    this.setState({ position, value: roundedValue });
  }

  render() {
    const {
      size,
      vertical,
      stepText,
      trackStyle,
      min,
      thumbStyle,
      markerStyle,
    } = this.props;

    return (
      <View
        style={{
          width: size,
          justifyContent: 'space-around',
          alignItems: vertical ? 'center' : undefined,
          flexDirection: vertical ? 'row' : 'column',
        }}
      >
        <View style={{ flex: vertical ? 1 : 0 }} />
        <View
          style={{
            flex: vertical ? 0.2 : 0,
            alignItems: 'center',
            margin: 5,
          }}
        >
          <View
            style={{
              width: size,
              justifyContent: 'center',
              alignItems: 'center',
              transform: [{ rotate: vertical ? '270deg' : '0deg' }],
            }}
          >
            <View
              style={{
                height: 50,
                width: size,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <View
                {...this.trackPanResponder.panHandlers}
                ref={container => {
                  this.trackContainer = container;
                }}
                hitSlop={{ top: 10, bottom: 30, left: 30, right: 10 }}
                style={[
                  {
                    width: this.trackSize,
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}
              >
                <SliderLine style={trackStyle} width={this.trackSize} />
                {this.numberOfSteps <= 10 && (
                  <SliderMarkers
                    markerCount={this.numberOfSteps}
                    width={this.trackSize}
                    style={markerStyle}
                  />
                )}
              </View>
              {this.state.value >= min && (
                <View
                  style={[styles.thumbContainer, { left: this.state.position }]}
                >
                  <View style={thumbStyle} {...this.panResponder.panHandlers} />
                </View>
              )}
            </View>
          </View>
        </View>
        <SliderLabels size={size} labels={stepText} vertical={vertical} />
      </View>
    );
  }
}

const SliderLine = ({ style, width }: { style: Object, width: number }) => (
  <View pointerEvents="none" style={styles.trackContainer}>
    <View style={[{ width }, style]} />
  </View>
);

const SliderMarkers = ({
  markerCount,
  width,
  style,
}: {
  markerCount: number,
  width: number,
  style: Object,
}) => (
  <View
    pointerEvents="none"
    style={{
      width,
      flexDirection: 'row',
      justifyContent: 'space-between',
    }}
  >
    {[...Array(markerCount + 1)].map((element, index) => (
      <View key={index} style={style} />
    ))}
  </View>
);

const SliderLabels = ({
  size,
  labels,
  vertical,
}: {
  size: number,
  labels?: Array<string>,
  vertical?: boolean,
}) => {
  return labels ? (
    <View
      style={{
        flex: vertical ? 1 : 0,
      }}
    >
      <View
        style={{
          top: vertical ? undefined : 0,
          width: vertical ? undefined : size,
          flexDirection: vertical ? 'column' : 'row',
          alignSelf: 'center',
          justifyContent: 'space-between',
          height: vertical ? size : 20,
        }}
      >
        {labels.map((label, i) => (
          <Text style={{ textAlign: 'center' }} key={i}>
            {label}
          </Text>
        ))}
      </View>
    </View>
  ) : (
    <View />
  );
};

const styles = StyleSheet.create({
  trackDefault: {
    height: 1,
    backgroundColor: 'black',
  },
  trackContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  thumbContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
  },
});

export default Slider;
