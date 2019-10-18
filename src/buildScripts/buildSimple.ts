import path from 'path';
import fs from 'fs';

import chalk from 'chalk';
import camelCase from 'camelcase';
//@ts-ignore
import simple from 'simple-icons';

//@ts-ignore
import packageJson from 'simple-icons/package.json';

import { appendToFile, writeFileToDisc, makeName } from './helpers';
import { parseXml } from './parseXml';

const SRC = path.join(__dirname, '..');
const DIR = path.join(SRC, 'simple');

export default function build() {
  console.log(chalk.blue.bold('Building Simple Icons'));
  let file = "import { Icon } from '../types'";
  file = appendToFile(`export const VERSION = '${packageJson.version}'`, file);

  fs.mkdirSync(DIR);
  console.log(`created ${chalk.italic(DIR)}`);

  const allIconNames: string[] = [];

  Object.values(simple).forEach(sIcon => {
    const simpleIcon = sIcon as SimpleIcon;
    const icon = parseXml(simpleIcon.svg);
    const iconName = makeName(simpleIcon.title);
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
  console.log(chalk.green.bold('Created Simple Icons'));
  console.log();
  console.log();
}

interface SimpleIcon {
  title: string;
  slug: string;
  svg: string;
  path: string;
  source: string;
  hex: string;
}
