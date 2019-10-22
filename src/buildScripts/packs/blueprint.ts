import { IconSvgPaths16, IconSvgPaths20 } from '@blueprintjs/icons';

import { buildFactory } from '../buildFactory';
import { fromValues } from '../builders';
import { Icon } from '../../types';
import { string } from 'prop-types';

export const buildBlueprint = () =>
  buildFactory(
    {
      name: 'Blueprint Icons',
      package: '@blueprintjs/icons/package.json',
      target: 'blueprint'
    },
    fromValues(
      [
        ...Object.entries(IconSvgPaths20).map(
          ([key, value]): BlueprintPaths => ({
            name: key,
            paths: value,
            size: 20
          })
        ),
        ...Object.entries(IconSvgPaths16).map(
          ([key, value]): BlueprintPaths => ({
            name: `${key}16`,
            paths: value,
            size: 16
          })
        )
      ],
      {
        createIcon,
        nameKey: 'name'
      }
    )
  );

function createIcon(packIcon: BlueprintPaths): Icon {
  return {
    tag: 'svg',
    attrs: {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: `0 0 ${packIcon.size} ${packIcon.size}`
    },
    children: packIcon.paths.map(
      (path): Icon => ({
        tag: 'path',
        attrs: {
          d: path,
          fillRule: 'evenodd'
        }
      })
    )
  };
}

interface BlueprintPaths {
  name: string;
  paths: string[];
  size: 16 | 20;
}
