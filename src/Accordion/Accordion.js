// @flow
import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  LayoutAnimation,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Divider from '../Divider';

import { colors } from '../styles';

const { width } = Dimensions.get('window');

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
    content: 'Placeholder',
    color: colors.primary,
    iconSize: 35,
  };

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
    const {
      title,
      titleStyle,
      content,
      contentStyle,
      color,
      iconSize,
    } = this.props;

    return (
      <View style={{ width: width * 0.9 }}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => this.setState({ active: !this.state.active })}
          style={{ flexDirection: 'row', justifyContent: 'space-between' }}
        >
          <View style={{ justifyContent: 'center' }}>
            <Text style={[{ fontSize: 25 }, StyleSheet.flatten(titleStyle)]}>
              {title}
            </Text>
          </View>
          <View style={styles.icon}>
            <Icon
              name={
                this.state.active ? 'keyboard-arrow-down' : 'keyboard-arrow-up'
              }
              size={iconSize}
              color={color}
            />
          </View>
        </TouchableOpacity>
        {this.state.active && (
          <Text style={[{ fontSize: 15 }, StyleSheet.flatten(contentStyle)]}>
            {content}
          </Text>
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
