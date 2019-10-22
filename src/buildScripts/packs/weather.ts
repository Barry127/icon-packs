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
  'weather-icons',
  'svg'
);

export const buildWeather = () =>
  buildFactory(
    {
      name: 'Weather Icons',
      package: path.join(
        __dirname,
        '../../../submodules/weather-icons/bower.json'
      ),
      target: 'weather',
      transformIcon
    },
    fromDirectory(ICONS_DIR)
  );

function transformIcon(icon: Icon): Icon {
  delete icon.attrs.style;
  delete icon.attrs.id;
  return icon;
}
