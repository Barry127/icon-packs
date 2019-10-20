import path from 'path';
import fs from 'fs';

import chalk from 'chalk';

import { appendToFile, writeFileToDisc, makeName } from './helpers';
import { parseXml } from './parseXml';
import { Icon } from '../types';

const SRC = path.join(__dirname, '..');
const DIR = path.join(SRC, 'game');

const ICONS_DIR = path.join(__dirname, '..', '..', 'submodules', 'game-icons');

export default function build() {
  console.log(chalk.blue.bold('Building Game Icons'));
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
        const icon = parseXml(fs.readFileSync(fullIconFile, 'utf8')) as Icon;
        if (Array.isArray(icon.children)) {
          icon.children = icon.children.filter(
            (icon, index, self) => self.length === 1 || index !== 0
          );
        }
        let iconName = makeName(iconFile.slice(0, -4));
        let i = 2;
        while (allIconNames.includes(iconName)) {
          iconName = makeName(iconFile.slice(0, -4) + i++);
        }
        allIconNames.push(iconName);
        file = appendToFile(
          `export const ${iconName}: Icon = ${JSON.stringify(icon, null, 2)}`,
          file
        );
        console.log(`created ${chalk.italic(iconName)}`);
      });
    });

  allIconNames.sort();
  file = appendToFile(
    `export const allIconNames = ${JSON.stringify(allIconNames)}`,
    file
  );

  writeFileToDisc(path.join(DIR, 'index.ts'), file);
  console.log(chalk.green.bold('Created Game Icons'));
  console.log();
  console.log();
}
