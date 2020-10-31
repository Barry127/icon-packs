import fs from 'fs';
import path from 'path';
import { packs } from './consts';

const rootPath = path.join(__dirname, '..');

packs.forEach((pack) => {
  fs.renameSync(
    path.join(rootPath, pack, 'index.js'),
    path.join(rootPath, pack, 'index.mjs')
  );
  fs.renameSync(
    path.join(rootPath, pack, 'index.js.map'),
    path.join(rootPath, pack, 'index.mjs.map')
  );
});
