import rimraf from 'rimraf';
import chalk from 'chalk';

import { productionFiles } from './consts';

console.log(chalk.magenta.bold('Clear Build'));

productionFiles.forEach(file => {
  rimraf.sync(file);
  console.log(`deleted ${chalk.italic(file)}`);
});

console.log(chalk.magenta.bold(`Clear Build [${chalk.green('Done')}]`));
