// @flow

import * as React from 'react';
import { Accordion } from 'react-native-usit-ui';

class AccordionExample extends React.Component<{}> {
  render() {
    return (
      <React.Fragment>
        <Accordion title="New title" />
        <Accordion content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do  eiusmod tempor incididunt ut labore et dolore magna aliqua." />
        <Accordion color="red" />
      </React.Fragment>
    );
  }
}

export default AccordionExample;
