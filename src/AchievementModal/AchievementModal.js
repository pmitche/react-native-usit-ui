// @flow
import React from 'react';
import {
  Image,
  ImageBackground,
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  Modal,
} from 'react-native';

import { colors, constants } from '../styles';

const { height, width } = Dimensions.get('window');

type Props = {
  bannerTitle: string,
  title: string,
  description: string,
  visible: boolean,
  onClose: () => void,
  closeText: string,
  animationType: 'none' | 'slide' | 'fade',
};

class AchievementModal extends React.Component<Props> {
  static defaultProps = {
    animationType: 'fade',
    bannerTitle: 'Thank you!',
    title: 'Well done!',
    description: 'You have answered all of the questions for today!',
    closeText: 'Close',
  };
  render() {
    const {
      bannerTitle,
      title,
      description,
      closeText,
      visible,
      onClose,
      animationType,
    } = this.props;
    return (
      <Modal
        transparent
        visible={visible}
        onRequestClose={() => onClose()}
        animationType={animationType}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#4A4A4AAA',
          }}
        >
          <ImageBackground
            resizeMode="contain"
            source={require('./banner.png')}
            style={{
              width: width * 0.9,
              height: constants.midValue * 100,
            }}
          >
            <View
              style={{
                justifyContent: 'flex-end',
                alignItems: 'center',
                height: constants.midValue * 85,
              }}
            >
              <Text
                style={{
                  fontSize: constants.midValue * 50,
                  color: 'white',
                  fontWeight: '300',
                }}
              >
                {bannerTitle}
              </Text>
            </View>
          </ImageBackground>
          <View
            style={{
              backgroundColor: 'white',
              width: width * 0.703,
              height: height * 0.45,
              borderBottomLeftRadius: constants.borderRadius,
              borderBottomRightRadius: constants.borderRadius,
            }}
          >
            <View
              style={{
                flex: 0.82,
                justifyContent: 'space-around',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderColor: colors.gray,
              }}
            >
              <Image
                source={require('./star.png')}
                style={{
                  height: constants.midValue * 180,
                  width: constants.midValue * 180,
                }}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: constants.midValue * 32,
                }}
              >
                {title}
              </Text>

              <Text
                style={{
                  width: width * 0.55,
                  marginBottom: 10,
                  textAlign: 'center',
                }}
              >
                {description}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => onClose()}
              style={{
                flex: 0.18,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{ color: '#008187', fontSize: constants.midValue * 32 }}
              >
                {closeText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

export default AchievementModal;
