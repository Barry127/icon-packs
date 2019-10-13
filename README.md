# icon-packs

Include icons from popular icon projects to your project. Icons are exported as ES2015 exports so only include the icons as you need, which reduces bundle size.

## Installation

Icon-packs can by installed using npm or yarn.

```bash
npm install icon-packs --save
```

```bash
yarn add icon-packs
```

## Usage

```js
import { add } from 'icon-packs/blueprint';

// render your add icon with preferred framework
```

### Format

Icons are formatted as plain objects and can be used with any framework:

```js
{
  tag: 'svg',
  attrs: {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: `0 0 24 24`
  },
  children: [{
    tag: 'desc',
    attrs: {},
    children: 'Icon Description'
  }, {
    tag: 'path',
    attrs: {
      x1: 0,
      y1: 0,
      x2: 23,
      y: 24
    }
  }]
}
```

### API

All packs export:

- `VERSION` - _current version of icon pack_
- `allIconNames` - _array of all available icon names in current icon pack_

## Icons

- [**Blueprint Icons**](https://blueprintjs.com/docs/#icons) License: [Apache License Version 2](https://github.com/palantir/blueprint/blob/develop/packages/icons/LICENSE)

## License

The icon-packs package is available with the MIT license. Different icon projects come with different lisences _be sure to check the lisence for used icons_.
