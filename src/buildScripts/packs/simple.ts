//@ts-ignore
import simple from 'simple-icons';

import { buildFactory } from '../buildFactory';
import { fromValues } from '../builders';
import { parseXml } from '../parseXml';
import { Icon } from '../../types';

export const buildSimple = () =>
  buildFactory(
    {
      name: 'Simple Icons',
      package: 'simple-icons/package.json',
      target: 'simple'
    },
    fromValues(simple, {
      createIcon: parseXml as (packIcon: string) => Icon,
      iconKey: 'svg',
      nameKey: 'title'
    })
  );
