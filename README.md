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
import { android } from 'icon-packs/devicons';
import { activity } from 'icon-packs/feather';
import { iosAdd } from 'icon-packs/ionicons';
import { alert } from 'icon-packs/octicons';
import { _4KFill } from 'icon-packs/remix';
import { adjustBrightness } from 'icon-packs/typicons';
import { wiAlien } from 'icon-packs/weather';

// render your icons with preferred framework
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

Icons with reserved filenames like `delete` or `export` are postfixed with an underscore: `delete_` or `export_`.

Icons starting with a number like `4K` are prefixed with an underscore: `_4K`.

## Icons

- [**Blueprint Icons**](https://blueprintjs.com/docs/#icons) License: [Apache License Version 2.0](https://github.com/palantir/blueprint/blob/develop/packages/icons/LICENSE)
- [**Devicons**](https://vorillaz.github.io/devicons) License: [MIT License](https://opensource.org/licenses/MIT)
- [**Feather Icons**](https://feathericons.com) License: [MIT License](https://github.com/feathericons/feather/blob/master/LICENSE)
- [**GitHub Octicons**](https://octicons.github.com/) :License [MIT License](https://github.com/primer/octicons/blob/master/LICENSE)
- [**Ionicons**](https://ionicons.com) License [MIT License](https://github.com/ionic-team/ionicons/blob/master/LICENSE)
- [**Remix Icon**](https://remixicon.com) License: [Apache License Version 2.0](https://github.com/Remix-Design/RemixIcon/blob/master/License)
- [**Typicons**](https://www.s-ings.com/typicons) License [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)
- [**Weather Icons**](https://erikflowers.github.io/weather-icons) License [SIL OFL 1.1](https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL)

## License

The icon-packs package is available with the MIT license. Different icon projects come with different lisences _be sure to check the lisence for used icons_.
