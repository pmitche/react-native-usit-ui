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
          item={{ id: 'dljf23flsd', text: 'Something' }}
          type="radio"
          selected={true}
          onPress={event => console.log(event)}
        />
        <ListElement
          item={{
            id: 'dljf23flsd',
            text: 'Something',
            subText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            }}
          type="radio"
          selected={false}
          onPress={event => console.log(event)}
        />
        <ListElement
          item={{ id: 'a', text: 'Something' }}
          type="checkbox"
          selected={true}
          onPress={event => console.log(event)}
        />
        <ListElement
          item={{ id: 'abc', text: 'Something' }}
          type="checkbox"
          selected={false}
          onPress={event => console.log(event)}
        />
      </View>
    );
  }
```

### API

```js
type ListItem = {
  id: string,
  text: string,
  subText?: string,
};

type Props = {
  item: ListElement,
  selected: boolean,
  onPress: () => void,
  type: 'radio' | 'checkbox',
  icons?: { checked: React.Component<*>, unchecked: React.Component<*> },
  color: ?string,
};
```
