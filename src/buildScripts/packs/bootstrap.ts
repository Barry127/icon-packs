import path from 'path';

import { buildFactory } from '../buildFactory';
import { fromDirectory } from '../builders';

const ICONS_DIR = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'node_modules',
  'bootstrap-icons',
  'icons'
);

export const buildBootstrap = () =>
  buildFactory(
    {
      name: 'Bootstrap Icons',
      package: 'bootstrap-icons/package.json',
      target: 'bootstrap'
    },
    fromDirectory(ICONS_DIR)
  );
