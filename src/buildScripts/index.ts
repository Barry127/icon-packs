import chalk from 'chalk';
import buildBlueprint from './buildBlueprint';
import buildFeather from './buildFeather';
import buildOpticons from './buildOcticons';
import buildRemix from './buildRemix';
import buildTypicons from './buildTypicons';

build();

function build() {
  buildBlueprint();
  buildFeather();
  buildOpticons();
  buildRemix();
  buildTypicons();

  console.log(chalk.bold.magentaBright('Compiling...'));
}
