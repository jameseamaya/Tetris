import Board from './board';

export default class Game {
  init () {

    const bg = new Image();
    bg.src = './blah/images/background.jpg';
    bg.onload = () => {
      const backgroundRect = new createjs.Shape();
      backgroundRect.graphics.beginBitmapFill(bg)
      .drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      stage.addChild(backgroundRect);
      stage.update();
      const board = new Board();
      board.init();
    }
  }
}
