import fs from 'fs';

import camelCase from 'camelcase';

export const reservedNames = [
  'catch',
  'delete',
  'export',
  'function',
  'import',
  'package',
  'private',
  'static',
  'switch'
];

export const makeName = (name: string) => {
  if (name.startsWith('.')) {
    name = `dot_${name}`;
  }
  name = name.replace(/\&/g, '_and_');
  name = name.replace(/\+/g, '_plus_');
  name = name.replace(/\'/g, '');
  name = name.replace(/\’/g, '');
  name = name.replace(/\!/g, '');

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
