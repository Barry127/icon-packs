import rimraf from 'rimraf';
import chalk from 'chalk';

import { packs, productionFiles } from './consts';

console.log(chalk.magenta.bold('Clear Build'));

packs
  .map((pack) => `src/${pack}`)
  .forEach((file) => {
    rimraf.sync(file);
    console.log(`deleted ${chalk.italic(file)}`);
  });

productionFiles.forEach((file) => {
  rimraf.sync(file);
  console.log(`deleted ${chalk.italic(file)}`);
});

console.log(chalk.magenta.bold(`Clear Build [${chalk.green('Done')}]`));
