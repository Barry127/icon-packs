import path from 'path';

import { buildFactory } from '../buildFactory';
import { fromSubDirectories } from '../builders';
import { Icon } from '../../types';

const ICONS_DIR = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'submodules',
  'game-icons'
);

export const buildGame = () =>
  buildFactory(
    {
      conflictStrategy: 'number',
      name: 'Game Icons',
      target: 'game',
      transformIcon
    },
    fromSubDirectories(ICONS_DIR)
  );

function transformIcon(icon: Icon) {
  if (Array.isArray(icon.children) && icon.children.length > 1) {
    icon.children = icon.children.filter((node, index) => index !== 0);
  }
  return icon;
}
