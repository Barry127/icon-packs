import rimraf from 'rimraf';
import chalk from 'chalk';

import { packs } from './consts';

console.log(chalk.magenta.bold('postBluid'));

packs
  .map(pack => `src/${pack}`)
  .forEach(file => {
    rimraf.sync(file);
    console.log(`deleted ${chalk.italic(file)}`);
  });

console.log(chalk.magenta.bold(`postBluid [${chalk.green('Done')}]`));
