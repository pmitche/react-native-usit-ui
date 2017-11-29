# MenuButton

![Screenshot with 2 MenuButton](./screenshots/menubutton1.png)
![Screenshot with 4 MenuButton](./screenshots/menubutton2.png)

### Usage

```js
...
import { View } from 'react-native';
import { MenuButton } from 'react-native-usit-ui';

...
  render() {
    return
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={{ flex: 0.9 }}>
          <MenuButton />
          <MenuButton row disabled />
          <MenuButton color="#8a09ed" />
          <MenuButton
            row
            disabled
            color="#8a09ed"
            icon={<Icon name="add" size={40} color="#8a09ed" />}
          />
        </View>
      </View>
  }
```

### API

```js
type Props = {
  text: string,
  onPress: () => void,
  color?: string,
  icon?: React.Component<*>,
  row?: boolean,
  fontSize?: number,
  disabled?: boolean,
};

static defaultProps = {
  text: 'Menu button',
  onPress: () => {},
  color: colors.primary,
  row: false,
  fontSize: 30,
  disabled: false,
};
```
