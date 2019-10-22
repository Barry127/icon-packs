import feather from 'feather-icons';
import camelCase from 'camelcase';

import { buildFactory } from '../buildFactory';
import { fromValues } from '../builders';
import { parseXml } from '../parseXml';
import { Icon } from '../../types';

export const buildFeather = () =>
  buildFactory(
    {
      name: 'Feather Icons',
      package: 'feather-icons/package.json',
      target: 'feather'
    },
    fromValues(feather.icons, {
      createIcon,
      nameKey: 'name'
    })
  );

function createIcon(packIcon: typeof feather['icons']['any']): Icon {
  const parsedIcon = parseXml(packIcon.contents) as Icon;
  delete packIcon.attrs.class;
  return {
    tag: 'svg',
    attrs: Object.entries(packIcon.attrs).reduce(
      (attrs, [key, value]) => {
        //@ts-ignore
        attrs[camelCase(key)] = value;
        return attrs;
      },
      {} as Icon['attrs']
    ),
    children: parsedIcon.tag === 'div' ? parsedIcon.children : [parsedIcon]
  };
}
