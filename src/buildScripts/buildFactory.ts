import path from 'path';
import fs from 'fs';

import chalk from 'chalk';

import { appendToFile, writeFileToDisc } from './helpers';
import { Icon } from '../types';

const SRC = path.join(__dirname, '..');

export function buildFactory(options: BuildOptions, builder: Builder) {
  console.log(chalk.blue.bold(`Building ${options.name}`));

  const DIR = path.join(SRC, options.target);
  const allIconNames: string[] = [];

  let file = "import { Icon } from '../types'";

  if (options.package) {
    const packageJson = require(options.package);
    file = appendToFile(
      `export const VERSION = '${packageJson.version}'`,
      file
    );
  } else {
    file = appendToFile(`export const VERSION = ''`, file);
  }

  fs.mkdirSync(DIR);
  console.log(`created ${chalk.italic(DIR)}`);

  file = builder(file, allIconNames, options);

  allIconNames.sort();
  file = appendToFile(
    `export const allIconNames = ${JSON.stringify(allIconNames)}`,
    file
  );

  writeFileToDisc(path.join(DIR, 'index.ts'), file);
  console.log(chalk.green.bold(`Created ${options.name}`));
  console.log();
  console.log();
}

export interface BuildOptions {
  /** Conflict Strategy for duplicate names
   * * dedupe: remove duplicate named icon
   * * number: postfix duplicate named icon with nomber
   */
  conflictStrategy?: 'dedupe' | 'number';

  /** Custom function to make icon name */
  customMakeName?: (source: string, round?: number) => string;

  /** Name for logging */
  name: string;

  /** Location for package file (containing version number) */
  package?: string;

  /** Target dir name */
  target: string;

  /** Transform generated Icon definition */
  transformIcon?: (icon: Icon) => Icon;
}

export type Builder = (
  file: string,
  allIconNames: string[],
  options: BuildOptions
) => string;
