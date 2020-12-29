import path from 'path';

import { buildFactory } from '../buildFactory';
import { fromDirectory } from '../builders';

const ICONS_DIR = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'submodules',
  'jam',
  'icons'
);

export const buildJAM = () =>
  buildFactory(
    {
      name: 'JAM Icons',
      target: 'jam'
    },
    fromDirectory(ICONS_DIR)
  );
