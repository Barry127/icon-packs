import path from 'path';

import { buildFactory } from '../buildFactory';
import { fromSubDirectories } from '../builders';

const ICONS_DIR = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'node_modules',
  'remixicon',
  'icons'
);

export const buildRemix = () =>
  buildFactory(
    {
      package: 'remixicon/package.json',
      name: 'Remix Icons',
      target: 'remix'
    },
    fromSubDirectories(ICONS_DIR)
  );
