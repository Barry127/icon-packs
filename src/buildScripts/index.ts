import chalk from 'chalk';
import buildBlueprint from './buildBlueprint';
import buildDevicons from './buildDevicons';
import buildFeather from './buildFeather';
import buildGame from './buildGame';
import buildIonicons from './buildIonicons';
import buildOpticons from './buildOcticons';
import buildRemix from './buildRemix';
import buildTypicons from './buildTypicons';
import buildWeather from './buildWeather';

build();

function build() {
  buildBlueprint();
  buildDevicons();
  buildFeather();
  buildGame();
  buildIonicons();
  buildOpticons();
  buildRemix();
  buildTypicons();
  buildWeather();

  console.log(chalk.bold.magentaBright('Compiling...'));
}
