# Divider

![Screenshot of divider](./screenshots/divider.png)

### Usage

```js
...
import { View } from 'react-native';
import { Divider, Button } from 'react-native-usit-ui';

...
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Title />
        <Button />
        <Divider />
        <Button />
        <Divider />
      </View>
    )
  }
```

### API

```js
type Props = {
  style?: Object,
};

default style = {
  width: width * 0.9,
  height: 1.5,
  marginVertical: 15,
  backgroundColor: '#B6B6B6',
}
```
