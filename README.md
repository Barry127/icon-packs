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
import { accountBookFill } from 'icons-packs/ant';
import { add } from 'icon-packs/blueprint';
import { accessibility1Line } from 'icon-packs/clarity';
import { android } from 'icon-packs/devicons';
import { _500Px } from 'icon-packs/fa';
import { activity } from 'icon-packs/feather';
import { _3DHammer } from 'icon-packs/game';
import { iosAdd } from 'icon-packs/ionicons';
import { alarmClock } from 'icon-packs/jam';
import { _3DRotation24 } from 'icon-packs/material';
import { alert } from 'icon-packs/octicons';
import { _4KFill } from 'icon-packs/remix';
import { aboutMe } from 'icon-packs/simple';
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

> Icon Packs exports all icons as es6 modules to enable tree shaking by default in most bundlers. Some environments only work with CommonJS. Icon Packs also exports icons in CommonJS format in the cjs directory: e.g. `import { activity } from 'icon-packs/cjs/feather`

## Icons

- [**Ant Design Icons**](https://ant.design/components/icon) License: [MIT License](https://github.com/ant-design/ant-design-icons/blob/master/packages/icons/package.json)
- [**Blueprint Icons**](https://blueprintjs.com/docs/#icons) License: [Apache License Version 2.0](https://github.com/palantir/blueprint/blob/develop/packages/icons/LICENSE)
- [**Clarity Icons**](https://clarity.design/icons) License: [MIT License](https://github.com/vmware/clarity-assets/blob/master/LICENSE)
- [**Devicons**](https://vorillaz.github.io/devicons) License: [MIT License](https://opensource.org/licenses/MIT)
- [**Feather Icons**](https://feathericons.com) License: [MIT License](https://github.com/feathericons/feather/blob/master/LICENSE)
- [**Font Awesome Free**](https://fontawesome.com/) License: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
- [**Game Icons**](https://game-icons.net) License: [CC BY 3.0](https://github.com/game-icons/icons/blob/master/license.txt)
- [**GitHub Octicons**](https://octicons.github.com/) :License [MIT License](https://github.com/primer/octicons/blob/master/LICENSE)
- [**Ionicons**](https://ionicons.com) License [MIT License](https://github.com/ionic-team/ionicons/blob/master/LICENSE)
- [**JAM Icons**](https://jam-icons.com/) License [MIT License](https://github.com/michaelampr/jam/blob/master/LICENSE)
- [**Material Icons**](http://google.github.io/material-design-icons) License [Apache License Version 2.0](https://github.com/google/material-design-icons/blob/master/LICENSE)
- [**Remix Icon**](https://remixicon.com) License: [Apache License Version 2.0](https://github.com/Remix-Design/RemixIcon/blob/master/License)
- [**Simple Icons**](https://simpleicons.org) License [CC0 1.0 Universal](https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md)
- [**Typicons**](https://www.s-ings.com/typicons) License [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)
- [**Weather Icons**](https://erikflowers.github.io/weather-icons) License [SIL OFL 1.1](https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL)

## License

The icon-packs package is available with the MIT license. Different icon projects come with different lisences _be sure to check the lisence for used icons_.
