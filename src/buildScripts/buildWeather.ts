import path from 'path';
import fs from 'fs';

import chalk from 'chalk';
//@ts-ignore
import bowerJson from '../../submodules/weather-icons/bower.json';

import { Icon } from '../types';
import { appendToFile, writeFileToDisc, makeName } from './helpers';
import { parseXml } from './parseXml';

const SRC = path.join(__dirname, '..');
const DIR = path.join(SRC, 'weather');

const ICONS_DIR = path.join(
  __dirname,
  '..',
  '..',
  'submodules',
  'weather-icons',
  'svg'
);

export default function build() {
  console.log(chalk.blue.bold('Building Weather Icons'));
  let file = "import { Icon } from '../types'";

  file = appendToFile(`export const VERSION = '${bowerJson.version}'`, file);

  fs.mkdirSync(DIR);
  console.log(`created ${chalk.italic(DIR)}`);

  const allIconNames: string[] = [];

  fs.readdirSync(ICONS_DIR).forEach(iconFile => {
    const fullIconFile = path.join(ICONS_DIR, iconFile);

    const iconData = fs.readFileSync(fullIconFile, 'utf8');
    const icon = parseXml(iconData.substr(iconData.indexOf('<svg'))) as Icon;
    delete icon.attrs['style'];
    delete icon.attrs['id'];

    const iconName = makeName(iconFile.slice(0, -4));
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
  console.log(chalk.green.bold('Created Weather Icons'));
  console.log();
  console.log();
}
