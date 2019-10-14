import path from 'path';
import fs from 'fs';

import chalk from 'chalk';
import camelCase from 'camelcase';
//@ts-ignore
import octicons from '@primer/octicons';

//@ts-ignore
import packageJson from '@primer/octicons/package.json';

import { Icon } from '../types';
import { appendToFile, writeFileToDisc, makeName } from './helpers';
import { parseXml } from './parseXml';

const SRC = path.join(__dirname, '..');
const DIR = path.join(SRC, 'octicons');

export default function build() {
  console.log(chalk.blue.bold('Building GitHub Octicons'));
  let file = "import { Icon } from '../types'";
  file = appendToFile(`export const VERSION = '${packageJson.version}'`, file);

  fs.mkdirSync(DIR);
  console.log(`created ${chalk.italic(DIR)}`);

  const allIconNames: string[] = [];

  Object.values(octicons as Octicons).forEach(octicon => {
    const icon = createIcon(octicon);
    const iconName = makeName(octicon.symbol);
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
  console.log(chalk.green.bold('Created GitHub Octicons'));
  console.log();
  console.log();
}

const blackListAttrs = ['class', 'aria-hidden'];

function createIcon(icon: Octicon): Icon {
  const children = [parseXml(icon.path) as Icon];
  const attrs = Object.entries(icon.options).reduce(
    (attrs, [key, value]) => {
      if (!blackListAttrs.includes(key)) {
        //@ts-ignore
        attrs[camelCase(key)] = value;
      }
      return attrs;
    },
    {} as Icon['attrs']
  );

  return {
    tag: 'svg',
    attrs,
    children
  };
}

interface Octicons {
  [key: string]: Octicon;
}

interface Octicon {
  keywords: string[];
  path: string;
  height: string;
  width: string;
  symbol: string;
  options: OcticonOptions;
  toSVG: (options?: OcticonOptions) => string;
}

interface OcticonOptions {
  [key: string]: string | number;
}
