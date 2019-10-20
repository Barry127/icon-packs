import chalk from 'chalk';

import buildAnt from './buildAnt';
import buildBlueprint from './buildBlueprint';
import buildClarity from './buildClarity';
import buildDevicons from './buildDevicons';
import buildFeather from './buildFeather';
import buildFontAwesome from './buildFontAwesome';
import buildGame from './buildGame';
import buildIonicons from './buildIonicons';
import buildMaterial from './buildMaterial';
import buildOpticons from './buildOcticons';
import buildRemix from './buildRemix';
import buildSimple from './buildSimple';
import buildTypicons from './buildTypicons';
import buildWeather from './buildWeather';

build();

function build() {
  buildAnt();
  buildBlueprint();
  buildClarity();
  buildDevicons();
  buildFeather();
  buildFontAwesome();
  buildGame();
  buildIonicons();
  buildMaterial();
  buildOpticons();
  buildRemix();
  buildSimple();
  buildTypicons();
  buildWeather();

  console.log(chalk.bold.magentaBright('Compiling...'));
}
