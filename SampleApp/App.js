// @flow

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';

import AccordionExample from './src/Accordion';
import AchievementModalExample from './src/AchievementModal';
import ButtonExample from './src/Button';
import DividerExample from './src/Divider';
import FloatingButtonExample from './src/FloatingButton';
import MenuButtonExample from './src/MenuButton';
import MultipleOptionExample from './src/MultipleOptionList';
import SingleOptionExample from './src/SingleOptionList';
import SliderExample from './src/Slider';
import StepperExample from './src/Stepper';

type Props = {};
type State = {
  showAccordion: boolean,
  showAchievementModal: boolean,
  showButton: boolean,
  showDivider: boolean,
  showFloatingButton: boolean,
  showMenuButton: boolean,
  showMultipleOption: boolean,
  showSingleOption: boolean,
  showSlider: boolean,
  showStepper: boolean,
};

const initState: State = {
  showAccordion: false,
  showAchievementModal: false,
  showButton: false,
  showDivider: false,
  showFloatingButton: false,
  showMenuButton: false,
  showMultipleOption: false,
  showSingleOption: false,
  showSlider: false,
  showStepper: false,
};

export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initState;
  }

  toggleAccordion = () =>
    this.setState({ ...initState, showAccordion: !this.state.showAccordion });
  toggleAchievementModal = () =>
    this.setState({
      ...initState,
      showAchievementModal: !this.state.showAchievementModal,
    });
  toggleButton = () =>
    this.setState({ ...initState, showButton: !this.state.showButton });
  toggleDivider = () =>
    this.setState({ ...initState, showDivider: !this.state.showDivider });
  toggleFloatingButton = () =>
    this.setState({
      ...initState,
      showFloatingButton: !this.state.showFloatingButton,
    });
  toggleMenuButton = () =>
    this.setState({ ...initState, showMenuButton: !this.state.showMenuButton });
  toggleMultipleOption = () =>
    this.setState({
      ...initState,
      showMultipleOption: !this.state.showMultipleOption,
    });
  toggleSingleOption = () =>
    this.setState({
      ...initState,
      showSingleOption: !this.state.showSingleOption,
    });
  toggleSlider = () =>
    this.setState({ ...initState, showSlider: !this.state.showSlider });
  toggleStepper = () =>
    this.setState({ ...initState, showStepper: !this.state.showStepper });

  render() {
    return (
      <View style={styles.outerContainer}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.container}
        >
          <Text style={styles.header}>USIT's mobile components</Text>

          <TouchableOpacity onPress={this.toggleAccordion}>
            <Text style={styles.item}>Accordion</Text>
          </TouchableOpacity>
          {this.state.showAccordion && <AccordionExample />}

          <TouchableOpacity onPress={this.toggleAchievementModal}>
            <Text style={styles.item}>AchievementModal</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.toggleButton}>
            <Text style={styles.item}>Button</Text>
          </TouchableOpacity>
          {this.state.showButton && <ButtonExample />}

          <TouchableOpacity onPress={this.toggleDivider}>
            <Text style={styles.item}>Divider</Text>
          </TouchableOpacity>
          {this.state.showDivider && <DividerExample />}

          <TouchableOpacity onPress={this.toggleFloatingButton}>
            <Text style={styles.item}>FloatingButton</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.toggleMenuButton}>
            <Text style={styles.item}>MenuButton</Text>
          </TouchableOpacity>
          {this.state.showMenuButton && <MenuButtonExample />}

          <TouchableOpacity onPress={this.toggleMultipleOption}>
            <Text style={styles.item}>MultipleOptionList</Text>
          </TouchableOpacity>
          {this.state.showMultipleOption && <MultipleOptionExample />}

          <TouchableOpacity onPress={this.toggleSingleOption}>
            <Text style={styles.item}>SingleOptionList</Text>
          </TouchableOpacity>
          {this.state.showSingleOption && <SingleOptionExample />}

          <TouchableOpacity onPress={this.toggleSlider}>
            <Text style={styles.item}>Slider</Text>
          </TouchableOpacity>
          {this.state.showSlider && <SliderExample />}

          <TouchableOpacity onPress={this.toggleStepper}>
            <Text style={styles.item}>Stepper</Text>
          </TouchableOpacity>
          {this.state.showStepper && <StepperExample />}
        </ScrollView>
        {this.state.showFloatingButton && <FloatingButtonExample />}
        {this.state.showAchievementModal && (
          <AchievementModalExample onClose={this.toggleAchievementModal} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 25,
    textAlign: 'center',
    margin: 15,
    fontWeight: '500',
  },
  item: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
  },
});
