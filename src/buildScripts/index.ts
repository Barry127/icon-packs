import chalk from 'chalk';
import buildBlueprint from './buildBlueprint';
import buildFeather from './buildFeather';
import buildRemix from './buildRemix';
import buildTypicons from './buildTypicons';

build();

function build() {
  // buildBlueprint();
  // buildFeather();
  // buildRemix();
  buildTypicons();

  console.log(chalk.bold.magentaBright('Compiling...'));
}
