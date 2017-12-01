// @flow
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../styles';

type StepperButtonProps = {
  iconName: string,
  action: (interval: number) => void,
  enabled: boolean,
  color: string,
  interval: number,
  longHoldInterval: number,
};

type StepperButtonState = {
  hasBeenHeld: boolean,
  pressedIn: boolean,
  pressedDuration: number,
};

class StepperButton extends React.Component<
  StepperButtonProps,
  StepperButtonState,
> {
  timer: number;
  constructor(props: StepperButtonProps) {
    super(props);
    this.state = {
      hasBeenHeld: false,
      pressedIn: false,
      pressedDuration: 0,
    };
  }

  holdInterval = 150;

  shouldComponentUpdate(nextProps: StepperButtonProps) {
    return this.props.enabled !== nextProps.enabled;
  }

  onPressIn(interval: number, longHoldInterval: number) {
    if (this.props.enabled) {
      this.timer = setInterval(() => {
        const duration = this.state.pressedDuration;
        this.props.action(duration > 5 ? longHoldInterval : interval);
        this.setState({
          hasBeenHeld: true,
          pressedDuration: duration + 1,
        });
      }, this.holdInterval);
    }
  }

  onPressOut = () => {
    this.setState({ hasBeenHeld: false, pressedIn: false, pressedDuration: 0 });
    clearInterval(this.timer);
  };

  render() {
    const {
      action,
      enabled,
      iconName,
      color,
      interval,
      longHoldInterval,
    } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={enabled ? 0.8 : 1}
        onPress={
          enabled && !this.state.hasBeenHeld ? () => action(interval) : null
        }
        onPressIn={
          enabled ? () => this.onPressIn(interval, longHoldInterval) : null
        }
        onPressOut={this.onPressOut}
        style={{
          flex: 3 / 11,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: enabled ? color : colors.white,
        }}
      >
        <Icon
          name={iconName}
          color={enabled ? colors.white : color}
          size={25}
        />
      </TouchableOpacity>
    );
  }
}

export default StepperButton;
