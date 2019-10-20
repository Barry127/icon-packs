import path from 'path';
import fs from 'fs';

import chalk from 'chalk';
//@ts-ignore
import packageJson from 'material-design-icons/package.json';

import { appendToFile, writeFileToDisc, makeName } from './helpers';
import { parseXml } from './parseXml';

const SRC = path.join(__dirname, '..');
const DIR = path.join(SRC, 'material');

const ICONS_DIR = path.join(
  __dirname,
  '..',
  '..',
  'node_modules',
  'material-design-icons'
);

const filters = ['sprites', 'iconfont'];

export default function build() {
  console.log(chalk.blue.bold('Building Material Icons'));
  let file = "import { Icon } from '../types'";

  file = appendToFile(`export const VERSION = '${packageJson.version}'`, file);

  fs.mkdirSync(DIR);
  console.log(`created ${chalk.italic(DIR)}`);

  const allIconNames: string[] = [];

  fs.readdirSync(ICONS_DIR)
    .filter(file => !filters.includes(file))
    .map(subDir => path.join(ICONS_DIR, subDir))
    .filter(iconDir => fs.statSync(iconDir).isDirectory())
    .forEach(iconDir => {
      const fullIconDir = path.join(iconDir, 'svg', 'production');
      fs.readdirSync(fullIconDir).forEach(iconFile => {
        const fullIconFile = path.join(fullIconDir, iconFile);
        const iconName = makeName(iconFile.slice(3, -6));
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
  console.log(chalk.green.bold('Created Material Icons'));
  console.log();
  console.log();
}
