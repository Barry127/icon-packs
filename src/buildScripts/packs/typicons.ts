import path from 'path';

import { buildFactory } from '../buildFactory';
import { fromDirectory } from '../builders';

const ICONS_DIR = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'node_modules',
  'typicons.font',
  'src',
  'svg'
);

export const buildTypicons = () =>
  buildFactory(
    {
      name: 'Typicons',
      package: 'typicons.font/package.json',
      target: 'typicons'
    },
    fromDirectory(ICONS_DIR)
  );
