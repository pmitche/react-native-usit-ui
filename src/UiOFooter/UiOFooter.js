import * as React from 'react';
import { Image, Dimensions, TouchableWithoutFeedback } from 'react-native';

const { width } = Dimensions.get('window');

type UiOFooterProps = {
  onPress: () => void,
  numberOfTriesBeforeAction?: number,
  touchInterval?: ?number,
};

type UiOFooterState = {
  touchCounter: number,
  touchCounterDeadline: ?Date,
};

class UiOFooter extends React.Component<UiOFooterProps, UiOFooterState> {
  static defaultProps = {
    numberOfTriesBeforeAction: 7,
    touchInterval: 0.5, // 30 seconds
  };

  constructor(props: UiOFooterProps) {
    super(props);
    this.state = {
      touchCounter: 0,
      touchCounterDeadline: props.touchInterval
        ? this.generateNewDeadline(props.touchInterval)
        : null,
    };
  }

  generateNewDeadline = (minutesInFuture: number) =>
    new Date(new Date().getTime() + minutesInFuture * 60000);

  getNewDeadline = () =>
    this.props.touchInterval
      ? this.generateNewDeadline(this.props.touchInterval)
      : null;

  incrementUiOFooter = () => {
    if (
      this.state.touchCounterDeadline &&
      new Date() > this.state.touchCounterDeadline
    ) {
      this.setState({
        touchCounter: 1,
        touchCounterDeadline: this.getNewDeadline(),
      });
    } else if (
      this.state.touchCounter === this.props.numberOfTriesBeforeAction
    ) {
      this.props.onPress();
      this.setState({
        touchCounter: 0,
        touchCounterDeadline: this.getNewDeadline(),
      });
    } else {
      this.setState({
        touchCounter: this.state.touchCounter + 1,
      });
    }
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this.incrementUiOFooter()}>
        <Image
          style={{
            alignSelf: 'center',
            height: 30,
            width: width * 0.6,
          }}
          resizeMode="contain"
          source={require('./UiO_logo.png')}
        />
      </TouchableWithoutFeedback>
    );
  }
}

export default UiOFooter;
