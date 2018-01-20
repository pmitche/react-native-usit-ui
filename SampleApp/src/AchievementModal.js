// @flow

import * as React from 'react';
import { AchievementModal } from 'react-native-usit-ui';

type Props = { onClose: () => void };
class AchievementModalExample extends React.Component<Props> {
  render() {
    return <AchievementModal visible onClose={this.props.onClose} />;
  }
}

export default AchievementModalExample;
