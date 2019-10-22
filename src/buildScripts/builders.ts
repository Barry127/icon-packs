import fs from 'fs';
import path from 'path';

import chalk from 'chalk';

import { Builder, BuildOptions } from './buildFactory';
import { appendToFile, makeName } from './helpers';
import { parseXml } from './parseXml';

import { Icon } from '../types';

export function fromValues(pack: any, fvOptions: FromValuesOptions): Builder {
  return function fromValuesBuilder(file, allIconNames, options) {
    (Array.isArray(pack) ? pack : Object.values(pack)).forEach(
      (packIcon: any) => {
        const iconName = _makeIconName(
          packIcon[fvOptions.nameKey],
          packIcon[fvOptions.nameKey],
          allIconNames,
          options
        );

        if (iconName === null) return;

        let icon = fvOptions.createIcon(
          fvOptions.iconKey ? packIcon[fvOptions.iconKey] : packIcon
        );

        if (options.transformIcon) {
          icon = options.transformIcon(icon);
        }

        allIconNames.push(iconName);
        file = appendToFile(
          `export const ${iconName}: Icon = ${JSON.stringify(icon, null, 2)}`,
          file
        );
        console.log(`created ${chalk.italic(iconName)}`);
      }
    );

    return file;
  };
}

export function fromDirectory(directory: string): Builder {
  return function fromDirectoryBuilder(file, allIconNames, options) {
    fs.readdirSync(directory)
      .filter(fileName => fileName.toLocaleLowerCase().endsWith('.svg'))
      .forEach(iconFile => {
        const fullIconFile = path.join(directory, iconFile);
        const iconName = _makeIconName(
          iconFile.slice(0, -4),
          fullIconFile,
          allIconNames,
          options
        );

        if (iconName === null) return;

        const iconData = fs.readFileSync(fullIconFile, 'utf8');
        let icon = parseXml(iconData.substr(iconData.indexOf('<svg'))) as Icon;

        if (options.transformIcon) {
          icon = options.transformIcon(icon);
        }

        allIconNames.push(iconName);
        file = appendToFile(
          `export const ${iconName}: Icon = ${JSON.stringify(icon, null, 2)}`,
          file
        );
        console.log(`created ${chalk.italic(iconName)}`);
      });

    return file;
  };
}

export function fromSubDirectories(
  directory: string,
  blackList: string[] = [],
  nestedSubDirectory?: string[]
): Builder {
  const builders: Builder[] = fs
    .readdirSync(directory)
    .filter(subDir => !blackList.includes(subDir))
    .map(subDir => path.join(directory, subDir))
    .filter(iconDir => fs.statSync(iconDir).isDirectory())
    .map(iconDir =>
      fromDirectory(
        nestedSubDirectory ? path.join(iconDir, ...nestedSubDirectory) : iconDir
      )
    );

  return mergeBuilders(builders);
}

function mergeBuilders(builders: Builder[]): Builder {
  return function mergedBuilders(file, allIconNames, options) {
    builders.forEach(builder => {
      file = builder(file, allIconNames, options);
    });

    return file;
  };
}

function _makeIconName(
  makeNameArgument: string,
  customMakeNameArgument: string,
  allIconNames: string[],
  options: BuildOptions
): string | null {
  let iconName = options.customMakeName
    ? options.customMakeName(customMakeNameArgument)
    : makeName(makeNameArgument);

  if (options.conflictStrategy && allIconNames.includes(iconName)) {
    switch (options.conflictStrategy) {
      case 'dedupe':
        return null;

      case 'number':
        let i = 2;
        while (allIconNames.includes(iconName)) {
          iconName = options.customMakeName
            ? options.customMakeName(customMakeNameArgument, i++)
            : makeName(makeNameArgument + i++);
        }
        break;
    }
  }

  return iconName;
}

export interface FromValuesOptions {
  createIcon: (packIcon: any) => Icon;
  nameKey: string;
  iconKey?: string;
}
