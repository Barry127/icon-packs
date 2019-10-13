import chalk from 'chalk';
import buildBlueprint from './buildBlueprint';

build();

function build() {
  buildBlueprint();

  console.log(chalk.bold.magentaBright('Compiling...'));
}
