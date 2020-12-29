import path from 'path';

import { buildFactory } from '../buildFactory';
import { fromSubDirectories } from '../builders';

const ICONS_DIR = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'node_modules',
  'devicon',
  'icons'
);

export const buildDevicons = () =>
  buildFactory(
    {
      name: 'Devicons',
      package: 'devicon/package.json',
      target: 'devicons'
    },
    fromSubDirectories(ICONS_DIR)
  );
