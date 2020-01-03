import path from 'path';

import { buildFactory } from '../buildFactory';
import { fromDirectory } from '../builders';
import { Icon } from '../../types';

const ICONS_DIR = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'submodules',
  'jam',
  'svg'
);

export const buildJAM = () =>
  buildFactory(
    {
      name: 'JAM Icons',
      target: 'jam'
      // transformIcon
    },
    fromDirectory(ICONS_DIR)
  );
