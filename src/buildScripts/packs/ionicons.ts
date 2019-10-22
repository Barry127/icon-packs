import path from 'path';

import { buildFactory } from '../buildFactory';
import { fromDirectory } from '../builders';

const ICONS_DIR = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'node_modules',
  'ionicons',
  'dist',
  'ionicons',
  'svg'
);

export const buildIonicons = () =>
  buildFactory(
    {
      name: 'Ionicons',
      package: 'ionicons/package.json',
      target: 'ionicons'
    },
    fromDirectory(ICONS_DIR)
  );
