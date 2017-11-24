# ListElement

![Screenshot of button](./screenshots/listelement.png)

### Usage

\*Note that the screenshot uses defaultIcons and colors.primary

```js
...
import { ScrollView, Image } from 'react-native';
import { ListElement } from 'react-native-usit-ui';

...

const icons = {
  checked: (
    <Image
      source={require('./checkedbox.png')}
      style={{ height: 20, width: 20 }}
    />
  ),
  unchecked: (
    <Image
      source={require('./uncheckedbox.png')}
      style={{ height: 20, width: 20 }}
    />
  ),
};
...

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ListElement
          text="Something"
          type="single"
          selected={true}
          onPress={event => console.log(event)}
        />
        <ListElement
          text="Something"
          type="single"
          subText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          selected={false}
          onPress={event => console.log(event)}
        />
        <ListElement
          text="Something"
          type="multiple"
          selected={true}
          onPress={event => console.log(event)}
        />
        <ListElement
          text="Something"
          type="multiple"
          selected={false}
          onPress={event => console.log(event)}
        />
      </View>
    );
  }
```

### API

```js
type Props = {
  text: string,
  selected: boolean,
  onPress: () => void,
  type: 'single' | 'multiple',
  icons?: { checked: React.Component<*>, unchecked: React.Component<*> },
  subText?: string,
  color: ?string,
};
```
