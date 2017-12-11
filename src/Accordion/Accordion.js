// @flow
import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  LayoutAnimation,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Divider from '../Divider'

import { colors } from '../styles';

const { width } = Dimensions.get('window');
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

type AccordionProps = {
  title: string,
  titleStyle: View.propTypes.style,
  content: string,
  contentStyle: View.propTypes.style,
  iconSize: number,
  color: string,
};

type AccordionState = {
  active: boolean,
};

class Accordion extends Component<AccordionProps, AccordionState> {
  static defaultProps = {
    title: 'Title',
    content: '',
    color: colors.primary,
    iconSize: 35,
  }

  constructor() {
    super();
    this.state = {
      active: false,
    };
  }

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  render() {
    const { title, titleStyle, content, contentStyle, color, iconSize } = this.props
    return (
      <View style={{ width: width * 0.9 }}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => this.setState({ active: !this.state.active })}
          style={{ flexDirection: 'row', justifyContent: 'space-between' }}
        >
          <View style={{ justifyContent: 'center' }}>
            <Text style={[{ fontSize: 25 }, titleStyle]}>{title}</Text>
          </View>
          <View style={styles.icon}>
            <AnimatedIcon
              name="keyboard-arrow-up"
              style={{
                transform: [{ rotate: this.state.active ? '180deg' : '0deg' }],
              }}
              size={iconSize}
              color={color}
            />
          </View>
        </TouchableOpacity>
        {this.state.active && (
            <Text style={[ { fontSize: 15 }, contentStyle ]}>{content}</Text>
        )}
        <Divider />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    height: 70,
    width: 45,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

export default Accordion;
