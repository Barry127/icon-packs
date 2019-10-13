import path from 'path';
import fs from 'fs';

import chalk from 'chalk';
import camelCase from 'camelcase';
import feather from 'feather-icons';

//@ts-ignore
import packageJson from 'feather-icons/package.json';

import { Icon } from '../types';
import { appendToFile, writeFileToDisc, makeName } from './helpers';
import { parseXml } from './parseXml';

const SRC = path.join(__dirname, '..');
const DIR = path.join(SRC, 'feather');

export default function build() {
  console.log(chalk.blue.bold('Building Feather Icons'));
  let file = "import { Icon } from '../types'";
  file = appendToFile(`export const VERSION = '${packageJson.version}'`, file);

  fs.mkdirSync(DIR);
  console.log(`created ${chalk.italic(DIR)}`);

  const allIconNames: string[] = [];

  Object.values(feather.icons).forEach(featherIcon => {
    const icon = createIcon(featherIcon);
    const iconName = makeName(featherIcon.name);
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
  console.log(chalk.green.bold('Created Feather Icons'));
  console.log();
  console.log();
}

function createIcon(icon: typeof feather['icons']['activity']): Icon {
  const parsedIcon = parseXml(icon.contents) as Icon;
  const attrs = Object.entries(icon.attrs).reduce(
    (attrs, [key, value]) => {
      //@ts-ignore
      attrs[camelCase(key)] = value;
      //@ts-ignore
      delete attrs.class;
      return attrs;
    },
    {} as Icon['attrs']
  );

  if (parsedIcon.tag === 'div') {
    return {
      tag: 'svg',
      attrs,
      children: parsedIcon.children
    };
  }

  return {
    tag: 'svg',
    attrs,
    children: [parsedIcon]
  };
}
