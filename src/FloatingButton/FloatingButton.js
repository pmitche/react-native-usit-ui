//@flow
import React, { Component } from 'react';
import {
  View,
  Animated,
  Dimensions,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { colors } from '../styles';

const { height, width } = Dimensions.get('window');

type Props = {
  color: string,
  colorBackground: string,
  title: string,
  size: number,
  marginBottom: number,
  cardTitle: string,
  cardHeight: number,
  children: any,
};

type State = {
  active: boolean,
  rotateAnimation: Animated,
  cardAnimation: Animated,
};

class FloatingButton extends Component<Props, State> {
  static defaultProps = {
    title: 'Title',
    color: '#1081A3',
    colorBackground: '#E5F1F3',
    marginBottom: 50,
    cardHeight: height * 0.3,
    size: 60,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      active: false,
      rotateAnimation: new Animated.Value(0),
      cardAnimation: new Animated.Value(0),
    };
  }

  rotateButton() {
    if (!this.state.active) {
      Animated.spring(this.state.rotateAnimation, { toValue: 1 }).start();
      Animated.spring(this.state.cardAnimation, { toValue: 1 }).start();
      this.setState({ active: true });
    } else {
      this.reset();
    }
  }

  reset() {
    Animated.spring(this.state.rotateAnimation, { toValue: 0 }).start();
    Animated.spring(this.state.cardAnimation, { toValue: 0 }).start();
    this.setState({ active: false });
  }

  renderTappableBackground() {
    const overlayColor = 'rgba(68, 68, 68, 0.6)';

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.overlay, { backgroundColor: overlayColor }]}
        onPress={() => this.reset()}
      />
    );
  }

  render() {
    const {
      color,
      colorBackground,
      size,
      title,
      marginBottom,
      cardHeight,
    } = this.props;
    const rotate = this.state.rotateAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '45deg'],
      useNativeDriver: true,
    });

    const promptCard = this.state.cardAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [500, 15],
      useNativeDriver: true,
    });

    return (
      <Animated.View
        pointerEvents="box-none"
        style={[styles.overlay, { backgroundColor: 'transparent' }]}
      >
        {this.state.active && this.renderTappableBackground()}
        <View
          pointerEvents="box-none"
          style={{
            position: 'absolute',
            bottom: marginBottom,
          }}
        >
          <Animated.View
            style={{
              width: width * 0.9,
              height: cardHeight,
              left: width / 2 - width * 0.9 / 2,
              transform: [{ translateY: promptCard }],
            }}
          >
            <View style={[styles.cardTitle, { backgroundColor: color }]}>
              <Text style={{ color: colors.white, fontSize: 18 }}>{title}</Text>
            </View>
            <View style={styles.cardContent}>{this.props.children}</View>
          </Animated.View>
          <TouchableOpacity
            onPress={() => this.rotateButton()}
            activeOpacity={1}
            style={{
              overflow: 'hidden',
              borderRadius: size / 2,
              backgroundColor: colorBackground,
              left: width / 2 - size / 2,
              width: size,
            }}
          >
            <Animated.Image
              source={require('./plusbutton.png')}
              style={{
                height: size,
                width: size,
                tintColor: color,
                transform: [{ rotate }],
              }}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  cardTitle: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  cardContent: {
    flex: 0.8,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: colors.white,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    elevation: 0,
    zIndex: 0,
  },
});

export default FloatingButton;
