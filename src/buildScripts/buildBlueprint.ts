import path from 'path';
import fs from 'fs';

import chalk from 'chalk';
import { IconSvgPaths16, IconSvgPaths20 } from '@blueprintjs/icons';
//@ts-ignore
import packageJson from '@blueprintjs/icons/package.json';

import { Icon } from '../types';
import { appendToFile, writeFileToDisc, makeName } from './helpers';

const SRC = path.join(__dirname, '..');
const DIR = path.join(SRC, 'blueprint');

export default function build() {
  console.log(chalk.blue.bold('Building Blueprint Icons'));
  let file = "import { Icon } from '../types'";
  file = appendToFile(`export const VERSION = '${packageJson.version}'`, file);

  fs.mkdirSync(DIR);
  console.log(`created ${chalk.italic(DIR)}`);

  const allIconNames: string[] = [];

  Object.keys(IconSvgPaths20).forEach(name => {
    //@ts-ignore
    const icon = createIconFromPaths(name, IconSvgPaths20[name]);
    const iconName = makeName(name);
    allIconNames.push(iconName);
    file = appendToFile(
      `export const ${iconName}: Icon = ${JSON.stringify(icon, null, 2)}`,
      file
    );
    console.log(`created ${chalk.italic(iconName)}`);
  });

  Object.keys(IconSvgPaths16).forEach(name => {
    //@ts-ignore
    const icon = createIconFromPaths(name, IconSvgPaths20[name]);
    const iconName = makeName(`${name}16`);
    allIconNames.push(iconName);
    file = appendToFile(
      `export const ${iconName}: Icon = ${JSON.stringify(icon, null, 2)}`,
      file
    );
    console.log(`created ${chalk.italic(iconName)}`);
  });

  allIconNames.sort();
  file = appendToFile(
    `export const allIconNames = ${JSON.stringify(allIconNames)}`,
    file
  );

  writeFileToDisc(path.join(DIR, 'index.ts'), file);
  console.log(chalk.green.bold('Created Blueprint Icons'));
  console.log();
  console.log();
}

function createIconFromPaths(
  name: string,
  paths: string[],
  size: number = 20
): Icon {
  return {
    tag: 'svg',
    attrs: {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: `0 0 ${size} ${size}`
    },
    children: [
      {
        tag: 'desc',
        attrs: {},
        children: name
      },
      ...paths.map(
        (path): Icon => ({
          tag: 'path',
          attrs: {
            d: path,
            fillRule: 'evenodd'
          }
        })
      )
    ]
  };
}
