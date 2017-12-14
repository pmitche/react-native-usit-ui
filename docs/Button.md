# Button

![Screenshot of button](./screenshots/button.png)

### Usage

```js
...
import { Dimensions, View } from 'react-native';
import { Button } from 'react-native-usit-ui';

const { width } = Dimensions.get('window')

...
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <Button large />
        <Button large inverse />
        <Button disabled />
        <Button disabled large />

        <View
          style={{
            flexDirection: 'row',
            width: width * 0.9,
            justifyContent: 'space-between',
          }}
        >
          <Button text="Yes" />
          <Button text="No" inverse />
        </View>
      </View>
    )
  }
```

### API

| Prop     | Default        |     Type     | Description                                            |
| :------- | :------------- | :----------: | :----------------------------------------------------- |
| inverse  | `false`        |  `boolean`   | Inverse the color of the button with white             |
| disabled | `false`        |  `boolean`   | Disable the button by making it gray and not pressable |
| large    | `false`        |  `boolean`   | Set the size of the button to large                    |
| text     | `'Big button'` |   `string`   | Text of the button                                     |
| color    | `#2294A8`      |   `string`   | Color of the button                                    |
| onPress  | `() => {}`     | `() => void` | Action to trigger when button is pressed               |
| style    | `null`         |   `Object`   | Style object that can be merged with default style     |
