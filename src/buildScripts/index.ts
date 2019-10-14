import chalk from 'chalk';
import buildBlueprint from './buildBlueprint';
import buildDevicons from './buildDevicons';
import buildFeather from './buildFeather';
import buildOpticons from './buildOcticons';
import buildRemix from './buildRemix';
import buildTypicons from './buildTypicons';

build();

function build() {
  buildBlueprint();
  buildDevicons();
  buildFeather();
  buildOpticons();
  buildRemix();
  buildTypicons();

  console.log(chalk.bold.magentaBright('Compiling...'));
}
