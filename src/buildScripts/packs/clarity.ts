import path from 'path';

import { buildFactory } from '../buildFactory';
import { fromSubDirectories } from '../builders';

const ICONS_DIR = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'submodules',
  'clarity-icons',
  'icons'
);

export const buildClarity = () =>
  buildFactory(
    {
      conflictStrategy: 'dedupe',
      name: 'Clarity Icons',
      target: 'clarity'
    },
    fromSubDirectories(ICONS_DIR)
  );
