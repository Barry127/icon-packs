import path from 'path';

import { buildFactory } from '../buildFactory';
import { fromDirectory } from '../builders';

const ICONS_DIR = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'node_modules',
  'css.gg',
  'icons',
  'svg'
);

export const buildCssGg = () =>
  buildFactory(
    {
      package: 'css.gg/package.json',
      name: 'css.gg',
      target: 'cssgg'
    },
    fromDirectory(ICONS_DIR)
  );
