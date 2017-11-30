# [Button]

![Screenshot of button](./screenshots/button.png)

### Usage

```js
...
import { Dimensions, View } from 'react-native';
import { Button } from 'react-native-usit-ui';

const { width } = Dimensions.get('window')

...
  render() {
    return <View>
        <Button style={{ marginVertical: 40 }} large />
        <Button style={{ marginVertical: 40 }} large inverse />

        <View
            style={{
                flexDirection: "row",
                width: width * 0.9,
                justifyContent: "space-between"
                }}>
          <Button style={{ marginVertical: 40 }} text="Ja" />
          <Button style={{ marginVertical: 40 }} text="Nei" inverse />
        </View>
      </View>;
  }
```

### API

```js
| Prop      | Default    | Type         | Description                                        |
| :-------- |:-----------|:------------:|:---------------------------------------------------|
| inverse   | `false`    | `boolean`    | Inverse the color of the button with white
| large     | `false`    | `boolean`    | Set the size of the button to large
| text      | `string`   | 'Big button' | Text of the button
| color     | `#2294A8`  | `string`     | Color of the button
| onPress   | `() => {}` | `() => void` | Action to trigger when button is pressed
| style     | null       | `Object`     | Style object that can be merged with default style
```
