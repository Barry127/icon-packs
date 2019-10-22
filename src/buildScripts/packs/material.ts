import path from 'path';

import { buildFactory } from '../buildFactory';
import { fromSubDirectories } from '../builders';
import { makeName } from '../helpers';

const ICONS_DIR = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'node_modules',
  'material-design-icons'
);

export const buildMaterial = () =>
  buildFactory(
    {
      conflictStrategy: 'dedupe',
      customMakeName,
      name: 'Material Icons',
      package: 'material-design-icons/package.json',
      target: 'material'
    },
    fromSubDirectories(
      ICONS_DIR,
      ['sprites', 'iconfont'],
      ['svg', 'production']
    )
  );

function customMakeName(fullIconPath: string) {
  const [iconFile] = fullIconPath.split('/').slice(-1);
  return makeName(iconFile.slice(3, -6));
}
