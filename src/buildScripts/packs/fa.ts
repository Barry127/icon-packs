import path from 'path';

import { buildFactory } from '../buildFactory';
import { fromSubDirectories } from '../builders';
import { makeName } from '../helpers';

const ICONS_DIR = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'node_modules',
  '@fortawesome',
  'fontawesome-free',
  'svgs'
);

export const buildFa = () =>
  buildFactory(
    {
      customMakeName,
      package: '@fortawesome/fontawesome-free/package.json',
      name: 'Font Awesome Icons',
      target: 'fa'
    },
    fromSubDirectories(ICONS_DIR)
  );

function customMakeName(fullIconPath: string) {
  const [iconDir, iconFile] = fullIconPath.split('/').slice(-2);

  return makeName(
    `${iconFile.slice(0, -4)}${iconDir !== 'brands' ? '-' + iconDir + '-' : ''}`
  );
}
