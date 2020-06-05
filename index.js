import Game from './src/game.js';

const game = new Game();

window.game = game; //we need to do that for appearing this constant in global space names

console.log(game);