// @flow

import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MenuButton } from 'react-native-usit-ui';

class MenuButtonExample extends React.Component<{}> {
  render() {
    return (
      <React.Fragment>
        <MenuButton style={{ height: 110 }} />
        <MenuButton style={{ height: 110 }} setElementsHorizontal inverse />
        <MenuButton style={{ height: 110 }} color="#8a09ed" />
        <MenuButton
          style={{ height: 110 }}
          setElementsHorizontal
          disabled
          color="#8a09ed"
          icon={<Icon name="add" size={40} color="gray" />}
        />
      </React.Fragment>
    );
  }
}

export default MenuButtonExample;
