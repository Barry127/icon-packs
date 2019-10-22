//@ts-ignore
import octicons from '@primer/octicons';
import camelCase = require('camelcase');

import { buildFactory } from '../buildFactory';
import { fromValues } from '../builders';
import { parseXml } from '../parseXml';
import { Icon } from '../../types';

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
  const children = [parseXml(packIcon.path) as Icon];
  const attrs = Object.entries(packIcon.options).reduce(
    (attrs, [key, value]) => {
      //@ts-ignore
      attrs[camelCase(key === 'class' ? 'className' : key)] = value;
      return attrs;
    },
    {} as Icon['attrs']
  );

  //@ts-ignore
  delete attrs.ariaHidden;

  return {
    tag: 'svg',
    attrs,
    children
  };
}

interface Octicon {
  keywords: string[];
  path: string;
  height: string;
  width: string;
  symbol: string;
  options: OcticonOptions;
  toSVG: (options?: OcticonOptions) => string;
}

interface OcticonOptions {
  [key: string]: string | number;
}
