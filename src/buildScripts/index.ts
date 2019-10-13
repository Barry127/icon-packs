import chalk from 'chalk';
import buildBlueprint from './buildBlueprint';
import buildFeather from './buildFeather';

build();

function build() {
  buildBlueprint();
  buildFeather();

  console.log(chalk.bold.magentaBright('Compiling...'));
}
