import Board from './board';
import { RUNNING, PAUSED, UNINITIALIZED } from './util';

export default class Game {
  constructor () {
    this.board = new Board();
    this.startScreen = null;
    this.pauseScreen = null;

    this.handleKeydown = this.handleKeydown.bind(this);
  }

  init () {
    const bg = new Image();
    bg.src = './images/background.jpg';
    bg.onload = () => {
      const backgroundRect = new createjs.Shape();
      backgroundRect.graphics.beginBitmapFill(bg)
      .drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      stage.addChild(backgroundRect);
      stage.update();

      this.drawStartScreen();
      this.drawPauseScreen();
    }
  }

  handleKeydown (e) {
    if (e.code === 'Space') {
      e.preventDefault();

      switch (this.board.status) {
        case UNINITIALIZED:
          this.board.init();
          this.hideStartScreen();
          break;
        case RUNNING:
          this.board.pause();
          this.hideBoard();
          this.showPauseScreen();
          break;
        case PAUSED:
          this.board.resume();
          this.showBoard();
          this.hidePauseScreen();
          break;
        default:
          return;
      }
    }
  }

  drawStartScreen () {
    this.startScreen = new createjs.Text("Press Space To Start",
                                  "50px Serif", "transparent");
    this.startScreen.x = 295;
    this.startScreen.y = 260;
    stage.addChild(this.startScreen);

    this.startScreenInterval = setInterval(() => {
      this.startScreen.color = this.startScreen.color === 'transparent' ? 'white' : 'transparent';
      stage.update();
    }, 700)

    document.addEventListener('keydown', this.handleKeydown);
  }

  drawPauseScreen () {
    this.pauseScreen = new createjs.Text("PAUSED",
                                  "50px Serif", "transparent");
    this.pauseScreen.x = 400;
    this.pauseScreen.y = 260;
    this.pauseScreen.visible = false;
    stage.addChild(this.pauseScreen);

    this.pauseScreenInterval = setInterval(() => {
      this.pauseScreen.color = 'white';
      stage.update();
    }, 100)
  }

  hideStartScreen () {
    this.startScreen.visible = false;
  }

  showPauseScreen () {
    this.pauseScreen.visible = true;
  }

  hidePauseScreen () {
    this.pauseScreen.visible = false;
  }

  hideBoard () {
    for (let i = 2; i < stage.children.length; i++) {
      stage.children[i].visible = false;
    }
  }

  showBoard () {
    for (let i = 2; i < stage.children.length; i++) {
      stage.children[i].visible = true;
    }
  }
}
