//@ts-ignore
import octicons from '@primer/octicons';
import camelCase = require('camelcase');

import { buildFactory } from '../buildFactory';
import { fromValues } from '../builders';
import { parseXml } from '../parseXml';
import { Icon } from '../../types';

console.log(octicons.alert);

export const buildOcticons = () =>
  buildFactory(
    {
      name: 'Octicons',
      package: '@primer/octicons/package.json',
      target: 'octicons'
    },
    fromValues(octicons, {
      createIcon,
      nameKey: 'symbol'
    })
  );

function createIcon(packIcon: Octicon): Icon {
  const icon = packIcon.heights['24'] || packIcon.heights['16'];
  const children = parseXml(icon.path, false) as Icon;
  const attrs = Object.entries(icon.options).reduce((attrs, [key, value]) => {
    //@ts-ignore
    attrs[camelCase(key === 'class' ? 'className' : key)] = value;
    return attrs;
  }, {} as Icon['attrs']);

  // @ts-ignore
  delete attrs.ariaHidden;

  return {
    tag: 'svg',
    attrs,
    children: Array.isArray(children) ? children : [children]
  };
}

interface Octicon {
  keywords: string[];
  heights: {
    16: any;
    24: any;
  };
  symbol: string;
  options: OcticonOptions;
  toSVG: (options?: OcticonOptions) => string;
}

interface OcticonOptions {
  [key: string]: string | number;
}
