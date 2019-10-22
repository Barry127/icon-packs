import path from 'path';

import { buildFactory } from '../buildFactory';
import { fromDirectory } from '../builders';

const ICONS_DIR = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'node_modules',
  'devicons',
  '!SVG'
);

export const buildDevicons = () =>
  buildFactory(
    {
      name: 'Devicons',
      package: 'devicons/package.json',
      target: 'devicons'
    },
    fromDirectory(ICONS_DIR)
  );
