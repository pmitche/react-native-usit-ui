# MultipleOptionList

![Screenshot of button](./screenshots/multipleoptionlist.png)

### Usage

\*Note that the screenshot uses defaultIcons and colors.primary

```js
...
import { ScrollView, Image } from 'react-native';
import { MultipleOptionList } from 'react-native-usit-ui';

...

const data = [
  { id: 'a', text: 'Tellus' },
  { id: 'b', text: 'Mercury' },
  { id: 'c', text: 'Pluto' },
  { id: 'd', text: 'Uranus' },
  {
    id: 'e',
    text: 'Saturn',
    subText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do        eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  { id: 'f', text: 'Jupiter' },
  { id: 'g', text: 'Venus' },
];

const icons = {
  // Icons from react-native-vector-icons could also be used in the same pattern
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
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <MultipleOptionList
          items={data}
          color="#f4414d" // Note that HEX value is required, due to opacity design
          icons={icons} // If not specified, default icons are used
          onChange={result => console.log(result)}
        />
      </ScrollView>
    );
  }
```

### API

| Prop     | Default                                                                                                                    |                                                 Type                                                  | Description                                                                   |
| :------- | :------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------- |
| items    | `null`                                                                                                                     |                                           `Array<ListItem>`                                           | Data element to be inserted                                                   |
| onChange | `() => {}`                                                                                                                 |                               `(result: Array<string⎮number>) => void`                                | Callback with result whenever you clock on a listelement                      |
| color    | `#2294A8`                                                                                                                  |                                               `string`                                                | Color of the button                                                           |
| icons    | `{ checked: (color: string) => ImageIcon(color, 'checked'), unchecked: (color: string) => ImageIcon(color, 'unchecked') }` | `{ checked: (color: string) => React.Component<*>, unchecked:(color: string) => React.Component<*> }` | Icons should be added as an object. Can be react-native-vector-icons or Image |

```js
const ImageIcon = (color: string, type: 'checked' | 'unchecked') => (
  <View style={{ borderRadius: 5, backgroundColor: 'white' }}>
    <Image
      source={
        type === 'checked'
          ? require('./checkedbox.png')
          : require('./uncheckedbox.png')
      }
      style={{
        height: midValue * 36,
        width: midValue * 36,
        // TODO: MOB-1236 fix checkbox icon
        tintColor: type === 'checked' ? undefined : color,
      }}
    />
  </View>
);

type ListItem = {
  id: string,
  text: string,
  subText?: string,
};
```
