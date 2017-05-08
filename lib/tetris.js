import Game from './game';

window.CANVAS_WIDTH = 1000;
window.CANVAS_HEIGHT = 600;
window.BOARD_X = 350;
window.BOARD_Y = 0;
window.BOARD_WIDTH = 300;
window.BOARD_HEIGHT = 600;
window.BLOCK_WIDTH = BOARD_WIDTH / 10;
window.BLOCK_HEIGHT = BOARD_HEIGHT / 20;

document.addEventListener('DOMContentLoaded', () => {
  window.stage = new createjs.Stage("demoCanvas");
  new Game().init();
});
