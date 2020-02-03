import path from 'path';

import { buildFactory } from '../buildFactory';
import { fromDirectory } from '../builders';

const ICONS_DIR = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'node_modules',
  'line-awesome',
  'svg'
);

export const buildLa = () =>
  buildFactory(
    {
      package: 'line-awesome/package.json',
      name: 'Line Awesome Icons',
      target: 'la'
    },
    fromDirectory(ICONS_DIR)
  );
