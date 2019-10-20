import path from 'path';
import fs from 'fs';

import chalk from 'chalk';

import { appendToFile, writeFileToDisc, makeName } from './helpers';
import { parseXml } from './parseXml';

const SRC = path.join(__dirname, '..');
const DIR = path.join(SRC, 'clarity');

const ICONS_DIR = path.join(
  __dirname,
  '..',
  '..',
  'submodules',
  'clarity-icons',
  'icons'
);

export default function build() {
  console.log(chalk.blue.bold('Building Clarity Icons'));
  let file = "import { Icon } from '../types'";

  file = appendToFile(`export const VERSION = ''`, file);

  fs.mkdirSync(DIR);
  console.log(`created ${chalk.italic(DIR)}`);

  const allIconNames: string[] = [];

  fs.readdirSync(ICONS_DIR)
    .map(subDir => path.join(ICONS_DIR, subDir))
    .filter(iconDir => fs.statSync(iconDir).isDirectory())
    .forEach(iconDir => {
      fs.readdirSync(iconDir).forEach(iconFile => {
        const fullIconFile = path.join(iconDir, iconFile);
        const iconName = makeName(iconFile.slice(0, -4));
        if (!allIconNames.includes(iconName)) {
          const icon = parseXml(fs.readFileSync(fullIconFile, 'utf8'));

          allIconNames.push(iconName);
          file = appendToFile(
            `export const ${iconName}: Icon = ${JSON.stringify(icon, null, 2)}`,
            file
          );
          console.log(`created ${chalk.italic(iconName)}`);
        }
      });
    });

  allIconNames.sort();
  file = appendToFile(
    `export const allIconNames = ${JSON.stringify(allIconNames)}`,
    file
  );

  writeFileToDisc(path.join(DIR, 'index.ts'), file);
  console.log(chalk.green.bold('Created Clarity Icons'));
  console.log();
  console.log();
}
