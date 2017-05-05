import IPiece from './pieces/i_piece';

const PIECES = ['L', 'J', 'I', 'O', 'S', 'Z', 'T'];
const DIRECTIONS = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

function getRandomPiece () {
  const index = Math.floor(Math.random() * 7);
  return PIECES[index];
}

function createPiece (type, grid) {
  switch (type) {
    case 'I':
      return new IPiece(grid);
    default:
      return;
  }
}

window.BOARD_X = 350;
window.BOARD_Y = 0;
window.BOARD_WIDTH = 300;
window.BOARD_HEIGHT = 600;
window.BLOCK_WIDTH = BOARD_WIDTH / 10;
window.BLOCK_HEIGHT = BOARD_HEIGHT / 20;

export default class Board {
  constructor () {
    this.grid = [];
    //ONLY FOR TESTING//
    window.grid = this.grid;
    //ONLY FOR TESTING
    this.gameOver = false;
    this.currentPiece = null;
    window.handleKeydown = this.handleKeydown.bind(this);
    this.setupGrid();
  }

  setupGrid () {
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 10; j++) {
        if (!this.grid[i]) {
          this.grid[i] = [];
        }
        this.grid[i][j] = false;
      }
    }

    //ONLY FOR TESTING
      // this.grid[0][1] = true;
    //ONLY FOR TESTING
  }

  init () {
    // while (!this.gameOver) {
      // const piece = createPiece('I', this.grid);
    //   while (piece.active) {
    //     piece.descend();
    //     console.log("hello");
    //   }
    // }
    //draw board
    this.draw();
    //get piece
    this.currentPiece = createPiece('I', this.grid);
    //draw piece
    this.currentPiece.draw();
    this.addEventListeners();

    setInterval(
      () => {
        if (this.currentPiece.finalMove) {
          this.clearLines()
          this.currentPiece = createPiece('I', this.grid);
          this.currentPiece.draw();
          this.addEventListeners();
        }
      },
      1000
    )
    //start desending piece
  }

  draw () {
    const graphics = new createjs.Graphics()
      .beginFill("black").drawRect(
        BOARD_X, BOARD_Y, BOARD_WIDTH, BOARD_HEIGHT
      );
    const boardRect = new createjs.Shape(graphics);

    stage.addChild(boardRect);
    stage.update();
  }

  addEventListeners () {
    document.addEventListener('keydown', handleKeydown);
  }

  handleKeydown (e) {

    if (DIRECTIONS.includes(e.key)) {
      e.preventDefault();
      this.currentPiece.move(e.key);
    }
  }

  clearLines () {
    for (let i = 19; i >= 0; i--) {
      while (this.shouldClearLine(i)) {
        this.clearLine(i);
      }
    }
  }

  shouldClearLine (i) {
    for (let j = 0; j < 10; j++) {
      if (!this.grid[i][j]) {
        return false;
      }
    }
    return true;
  }

  clearLine (i) {
    this.clearLineAndSetFalse(i);
    this.moveEverythingDown();
  }

  clearLineAndSetFalse (i) {
    for (let j = 0; j < 10; j++) {
      this.grid[i][j].graphics.clear();
      stage.update();
      this.grid[i][j] = false;
    }
  }

  moveEverythingDown() {
    for (let i = 19; i >= 0; i--) {
      for (let j = 0; j < 10; j++) {
        if (this.grid[i][j]) {
          debugger
          this.grid[i][j].y += BLOCK_WIDTH;
          stage.update();
          this.grid[i+1][j] = this.grid[i][j];
          this.grid[i][j] = false;
        }
      }
    }
  }
}
