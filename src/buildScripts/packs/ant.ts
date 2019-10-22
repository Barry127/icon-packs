import * as ant from '@ant-design/icons-svg';
import { IconDefinition } from '@ant-design/icons-svg/lib/types';

import { buildFactory } from '../buildFactory';
import { fromValues } from '../builders';
import { Icon } from '../../types';

export const buildAnt = () =>
  buildFactory(
    {
      name: 'Ant Design Icons',
      package: '@ant-design/icons-svg/package.json',
      target: 'ant'
    },
    fromValues(
      Object.values(ant).map(packIcon => ({
        ...packIcon,
        name: `${packIcon.name}-${packIcon.theme.replace(
          'twotone',
          'two-tone'
        )}`
      })),
      {
        createIcon,
        nameKey: 'name'
      }
    )
  );

function createIcon(packIcon: IconDefinition): Icon {
  return typeof packIcon.icon === 'function'
    ? createTwoToneIcon(packIcon.icon('primaryFill', 'secondaryFill') as Icon)
    : (packIcon.icon as Icon);
}

const blackList = ['primaryFill', 'secondaryFill'];
function createTwoToneIcon(icon: Icon): Icon {
  if (icon.attrs.fill && blackList.includes(icon.attrs.fill)) {
    icon.attrs.className = icon.attrs.fill;
    delete icon.attrs.fill;
  }

  if (Array.isArray(icon.children)) {
    icon.children.map(createTwoToneIcon);
  }

  return {
    ...icon
  };
}
