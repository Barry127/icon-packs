import fs from 'fs';

import camelCase from 'camelcase';

export const reservedNames = [
  'delete',
  'export',
  'function',
  'import',
  'package'
];

export const makeName = (name: string) => {
  const iconName = camelCase(name);
  return iconName.match(/^\d/)
    ? `_${iconName}`
    : reservedNames.includes(iconName)
    ? `${iconName}_`
    : iconName;
};

export const appendToFile = (data: string, file: string = '') =>
  file ? `${file}\n\n${data}` : data;

export const writeFileToDisc = (fileName: string, data: string) => {
  fs.writeFileSync(fileName, data);
};
