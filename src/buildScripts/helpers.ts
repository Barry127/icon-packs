import fs from 'fs';

export const appendToFile = (data: string, file: string = '') =>
  file ? `${file}\n\n${data}` : data;

export const writeFileToDisc = (fileName: string, data: string) => {
  fs.writeFileSync(fileName, data);
};

export const reservedNames = ['delete', 'export', 'function', 'import'];
