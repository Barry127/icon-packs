import path from 'path';
import fs from 'fs';

import chalk from 'chalk';
//@ts-ignore
import packageJson from 'remixicon/package.json';

import { appendToFile, writeFileToDisc, makeName } from './helpers';
import { parseXml } from './parseXml';
import { Icon } from '../types';

const SRC = path.join(__dirname, '..');
const DIR = path.join(SRC, 'remix');

const ICONS_DIR = path.join(
  __dirname,
  '..',
  '..',
  'node_modules',
  'remixicon',
  'icons'
);

export default function build() {
  console.log(chalk.blue.bold('Building Remix Icon'));
  let file = "import { Icon } from '../types'";

  file = appendToFile(`export const VERSION = '${packageJson.version}'`, file);

  fs.mkdirSync(DIR);
  console.log(`created ${chalk.italic(DIR)}`);

  const allIconNames: string[] = [];

  fs.readdirSync(ICONS_DIR)
    .map(subDir => path.join(ICONS_DIR, subDir))
    .forEach(iconDir => {
      fs.readdirSync(iconDir).forEach(iconFile => {
        const fullIconFile = path.join(iconDir, iconFile);
        const icon = parseXml(fs.readFileSync(fullIconFile, 'utf8')) as Icon;
        //@ts-ignore
        icon.children[0]!.children = icon.children[0]!.children.filter(
          (child: Icon) => child.attrs.fill !== 'none'
        );
        const iconName = makeName(iconFile.slice(0, -4));
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
  console.log(chalk.green.bold('Created Remix Icon'));
  console.log();
  console.log();
}
