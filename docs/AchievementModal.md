# AchievementModal

![Screenshot of achievementModal](./screenshots/achievementmodal.png)

### Usage

```js
...
import { View } from 'react-native';
import { AchievementModal, Button } from 'react-native-usit-ui';


...
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  render() {
    return (
      <View
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Button onPress={() => this.setState({ open: !this.state.open})} />
        <AchievementModal
          visible={this.state.open}
          onClose={() => this.setState({ open: false}) }
        />
      </View>
    )
  }
```

### API

| Prop          | Default                                             |            Type             | Description                          |
| :------------ | :-------------------------------------------------- | :-------------------------: | :----------------------------------- |
| bannerTitle   | `Thank you`                                         |          `string`           | Title of the banner                  |
| title         | `Well done!`                                        |          `string`           | Title of the achievement             |
| description   | `You have answered all of the questions for today!` |          `string`           | Description of you achievement       |
| visible       | `false`                                             |          `boolean`          | Determine if modal is visible or not |
| onClose       | `undefined`                                         |        `() => void`         | Callback for closing the modal       |
| closeText     | `Close`                                             |          `string`           | Close button text                    |
| animationType | `fade`                                              | `'none' | 'fade' | 'slide'` | Animation type of modal              |
