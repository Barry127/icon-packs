import path from 'path';
import fs from 'fs';

import chalk from 'chalk';

//@ts-ignore
import packageJson from 'ionicons/package.json';

import { appendToFile, writeFileToDisc, makeName } from './helpers';
import { parseXml } from './parseXml';

const SRC = path.join(__dirname, '..');
const DIR = path.join(SRC, 'ionicons');

const ICONS_DIR = path.join(
  __dirname,
  '..',
  '..',
  'node_modules',
  'ionicons',
  'dist',
  'ionicons',
  'svg'
);

export default function build() {
  console.log(chalk.blue.bold('Building Ionicons'));
  let file = "import { Icon } from '../types'";
  file = appendToFile(`export const VERSION = '${packageJson.version}'`, file);

  fs.mkdirSync(DIR);
  console.log(`created ${chalk.italic(DIR)}`);

  const allIconNames: string[] = [];

  fs.readdirSync(ICONS_DIR).forEach(iconFile => {
    const fullIconFile = path.join(ICONS_DIR, iconFile);
    const icon = parseXml(fs.readFileSync(fullIconFile, 'utf8'));
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
  console.log(chalk.green.bold('Created Ionicons'));
  console.log();
  console.log();
}