import chalk from 'chalk';

import * as packBuilders from './packs';

Object.values(packBuilders).forEach(builder => {
  builder();
});

console.log(chalk.bold.magentaBright('Compiling...'));
