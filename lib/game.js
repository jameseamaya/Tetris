import Board from './board';
import { RUNNING, PAUSED, UNINITIALIZED, GAMEOVER} from './util';

export default class Game {
  constructor () {
    this.board = new Board();
    this.startScreen = document.querySelector('.start');
    this.pauseScreen = document.querySelector('.pause');
    this.startInterval = null;
    this.music = document.getElementsByTagName('audio')[0];


    this.handleClick = this.handleClick.bind(this);
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
      this.removeLoadingScreen();
      this.showStartScreen();
      this.music.play();

      this.startScreen.parentElement.addEventListener('click', this.handleClick);
      document.addEventListener('keydown', this.handleKeydown);
    }
  }

  handleClick (e) {
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
        case GAMEOVER:
          this.board.endGame();
          this.hidePauseScreen();
          this.hideStartScreen();
          this.hideGameOverScreen();
          this.removeBoardFromStage();
          this.board = new Board();
          this.board.init();
          break;
        default:
          return;
      }
  }

  handleKeydown (e) {
    if (e.key === 'r') {
      if (this.board.status !== UNINITIALIZED) {
        this.board.endGame();
        this.hidePauseScreen();
        this.hideStartScreen();
        this.hideGameOverScreen();
        this.removeBoardFromStage();
        this.board = new Board();
        this.board.init();
      }
    } else if (e.key === 'q') {
      if (this.board.status !== UNINITIALIZED) {
        this.board.endGame();
        this.hidePauseScreen();
        this.hideStartScreen();
        this.hideGameOverScreen();
        this.hideBoard();
        this.removeBoardFromStage();
        this.board = new Board();
        this.showStartScreen();
      }
    }

    if (e.key === 'm') {
      this.music.paused ? this.music.play() : this.music.pause();
    }
  }

  showStartScreen () {
    for (let i = 1; i < 4; i++) {
      document.querySelector(`.piece-${i} div`).classList.remove('hide-back');
    }
    this.startScreen.parentElement.classList.add('remove-border');

    this.startInterval = setInterval(() => {
      if (Array.from(this.startScreen.classList).includes('hide-div')) {
        this.startScreen.classList.remove('hide-div');
      } else {
        this.startScreen.classList.add('hide-div')
      }
    }, 600)
  }

  hideStartScreen () {
    this.startScreen.parentElement.classList.remove('remove-border');
    clearInterval(this.startInterval);
    this.startScreen.classList.add('hide-div');
    for (let i = 1; i < 4; i++) {
      document.querySelector(`.piece-${i} div`).classList.add('hide-back');
    }
  }

  showPauseScreen () {
    this.pauseScreen.classList.remove('hide-div');
  }

  hidePauseScreen () {
    this.pauseScreen.classList.add('hide-div');
  }

  hideGameOverScreen () {
    document.querySelector('.gameover').classList.add('hide-div');
  }

  hideBoard () {
    for (let i = 1; i < stage.children.length; i++) {
      stage.children[i].visible = false;
    }
  }

  showBoard () {
    for (let i = 1; i < stage.children.length; i++) {
      stage.children[i].visible = true;
    }
  }

  removeBoardFromStage () {
    const children = stage.children.slice();
    for (let i = 2; i < children.length; i++) {
      children[i].graphics.clear();
      stage.removeChild(children[i]);
    }

    stage.update();
  }

  removeLoadingScreen () {
    document.querySelector('.canvas-loading').classList.add('hide-div');
  }
}
// import Board from './board';
// import { RUNNING, PAUSED, UNINITIALIZED, GAMEOVER} from './util';
//
// export default class Game {
//   constructor () {
//     this.board = new Board();
//     this.startScreen = document.querySelector('.start');
//     this.pauseScreen = document.querySelector('.pause');
//     this.startInterval = null;
//     this.music = document.getElementsByTagName('audio')[0];
//     this.showStartScreen();
//
//     this.handleClick = this.handleClick.bind(this);
//     this.handleKeydown = this.handleKeydown.bind(this);
//   }
//
//   init () {
//     const bg = new Image();
//     bg.src = './images/background.jpg';
//     bg.onload = () => {
//       const backgroundRect = new createjs.Shape();
//       backgroundRect.graphics.beginBitmapFill(bg)
//       .drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
//       stage.addChild(backgroundRect);
//       stage.update();
//
//       this.startScreen.parentElement.addEventListener('click', this.handleClick);
//       document.addEventListener('keydown', this.handleKeydown);
//     }
//   }
//
//   handleClick (e) {
//       switch (this.board.status) {
//         case UNINITIALIZED:
//           this.board.init();
//           this.hideStartScreen();
//           break;
//         case RUNNING:
//           this.board.pause();
//           this.hideBoard();
//           this.showPauseScreen();
//           break;
//         case PAUSED:
//           this.board.resume();
//           this.showBoard();
//           this.hidePauseScreen();
//           break;
//         case GAMEOVER:
//           this.board.endGame();
//           this.hidePauseScreen();
//           this.hideStartScreen();
//           this.hideGameOverScreen();
//           this.removeBoardFromStage();
//           this.board = new Board();
//           this.board.init();
//           break;
//         default:
//           return;
//       }
//   }
//
//   handleKeydown (e) {
//     if (e.key === 'r') {
//       if (this.board.status !== UNINITIALIZED) {
//         this.board.endGame();
//         this.hidePauseScreen();
//         this.hideStartScreen();
//         this.hideGameOverScreen();
//         this.removeBoardFromStage();
//         this.board = new Board();
//         this.board.init();
//       }
//     } else if (e.key === 'q') {
//       if (this.board.status !== UNINITIALIZED) {
//         this.board.endGame();
//         this.hidePauseScreen();
//         this.hideStartScreen();
//         this.hideGameOverScreen();
//         this.hideBoard();
//         this.removeBoardFromStage();
//         this.board = new Board();
//         this.showStartScreen();
//       }
//     }
//
//     if (e.key === 'm') {
//       this.music.paused ? this.music.play() : this.music.pause();
//     }
//   }
//
//   showStartScreen () {
//     for (let i = 1; i < 4; i++) {
//       document.querySelector(`.piece-${i} div`).classList.remove('hide-back');
//     }
//     this.startScreen.parentElement.classList.add('remove-border');
//
//     this.startInterval = setInterval(() => {
//       if (Array.from(this.startScreen.classList).includes('hide-div')) {
//         this.startScreen.classList.remove('hide-div');
//       } else {
//         this.startScreen.classList.add('hide-div')
//       }
//     }, 600)
//   }
//
//   hideStartScreen () {
//     this.startScreen.parentElement.classList.remove('remove-border');
//     clearInterval(this.startInterval);
//     this.startScreen.classList.add('hide-div');
//     for (let i = 1; i < 4; i++) {
//       document.querySelector(`.piece-${i} div`).classList.add('hide-back');
//     }
//   }
//
//   showPauseScreen () {
//     this.pauseScreen.classList.remove('hide-div');
//   }
//
//   hidePauseScreen () {
//     this.pauseScreen.classList.add('hide-div');
//   }
//
//   hideGameOverScreen () {
//     document.querySelector('.gameover').classList.add('hide-div');
//   }
//
//   hideBoard () {
//     for (let i = 1; i < stage.children.length; i++) {
//       stage.children[i].visible = false;
//     }
//   }
//
//   showBoard () {
//     for (let i = 1; i < stage.children.length; i++) {
//       stage.children[i].visible = true;
//     }
//   }
//
//   removeBoardFromStage () {
//     const children = stage.children.slice();
//     for (let i = 2; i < children.length; i++) {
//       children[i].graphics.clear();
//       stage.removeChild(children[i]);
//     }
//
//     stage.update();
//   }
// }
