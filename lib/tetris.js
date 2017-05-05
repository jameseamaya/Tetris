import Game from './game';

document.addEventListener('DOMContentLoaded', () => {
  window.stage = new createjs.Stage("demoCanvas");
  new Game().init();
});
