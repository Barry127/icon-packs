import chalk from 'chalk';
import buildBlueprint from './buildBlueprint';
import buildFeather from './buildFeather';
import buildRemix from './buildRemix';

build();

function build() {
  buildBlueprint();
  buildFeather();
  buildRemix();

  console.log(chalk.bold.magentaBright('Compiling...'));
}
