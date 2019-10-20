import path from 'path';
import fs from 'fs';

import chalk from 'chalk';
import * as ant from '@ant-design/icons-svg';

//@ts-ignore
import packageJson from '@ant-design/icons-svg/package.json';

import { Icon } from '../types';
import { appendToFile, writeFileToDisc, makeName } from './helpers';

const SRC = path.join(__dirname, '..');
const DIR = path.join(SRC, 'ant');

export default function build() {
  console.log(chalk.blue.bold('Building Ant Icons'));
  let file = "import { Icon } from '../types'";
  file = appendToFile(`export const VERSION = '${packageJson.version}'`, file);

  fs.mkdirSync(DIR);
  console.log(`created ${chalk.italic(DIR)}`);

  const allIconNames: string[] = [];

  Object.entries(ant).forEach(([key, value]) => {
    const icon =
      typeof value.icon === 'function'
        ? createTwoToneIcon(value.icon('primaryFill', 'secondaryFill'))
        : value.icon;
    const iconName = makeName(key);
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
  console.log(chalk.green.bold('Created Ant Icons'));
  console.log();
  console.log();
}

function createTwoToneIcon(icon: any): Icon {
  const blackList = ['primaryFill', 'secondaryFill'];
  if (icon.attrs.fill && blackList.includes(icon.attrs.fill)) {
    const fill = icon.attrs.fill;
    delete icon.attrs.fill;
    icon.attrs.className = icon.attrs.className
      ? `${icon.attrs.className} ${fill}`
      : fill;
  }

  if (Array.isArray(icon.children)) {
    icon.children.map(createTwoToneIcon);
  }

  return {
    ...icon
  };
}
