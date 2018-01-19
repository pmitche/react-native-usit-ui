// @flow

import * as React from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import { FloatingButton } from 'react-native-usit-ui';

const CardButton = ({ text, icon }: { text: string, icon: any }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <TouchableOpacity>
      <Image source={icon} style={{ height: 80, width: 80 }} />
    </TouchableOpacity>
    <Text style={{ marginTop: 10 }}>{text}</Text>
  </View>
);

const icons = [
  { text: 'Activity', icon: require('./shoe.png') },
  { text: 'Health', icon: require('./health.png') },
  { text: 'Symptoms', icon: require('./symptom.png') },
];

class FloatingButtonExample extends React.Component<{}> {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <FloatingButton title="Legg til" size={50}>
          {icons.map((element, index) => (
            <CardButton key={index} text={element.text} icon={element.icon} />
          ))}
        </FloatingButton>
      </View>
    );
  }
}

export default FloatingButtonExample;
