import { createPiece, getRandomType, DIRECTIONS } from './util.js';

export default class Board {
  constructor () {
    this.grid = [];
    //ONLY FOR TESTING//
    window.grid = this.grid;
    //ONLY FOR TESTING
    this.gameOver = false;
    this.currentPiece = null;
    window.handleKeydown = this.handleKeydown.bind(this);
    this.completionInterval = null;
    this.descendInterval = null;
    this.nextThree = [];
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
  }

  init () {
    this.draw();
    this.currentPiece = createPiece(this.grid);
    // this.getNextThreePieces();
    // this.moveNextThreePieces();
    this.currentPiece.draw();
    this.addEventListeners();


    this.completionInterval = this.handlePieceCompletion();
    this.descendInterval = this.descendCurrentPiece();
  }

  getNextThreePieces () {
    //FIXXXXXXX
      const piece = createPiece(this.grid);
      piece.drawSide(200);
      const piece2 = createPiece(this.grid);
      piece2.drawSide(400);
  }

  moveNextThreePieces () {
  }

  movePiece(piece, position) {
  }

  handlePieceCompletion() {
    return setInterval(
      () => {
        if (this.currentPiece.gameOver) {
          this.endGame();
        } else if (this.currentPiece.finalMove) {
          this.clearLines();
          this.currentPiece = createPiece(this.grid);
          this.currentPiece.draw();
          this.addEventListeners();
        }
      },
      10
    );
  }

  descendCurrentPiece () {
    return setInterval(
      () => {
        if (!this.currentPiece.gameOver &&
              !this.currentPiece.finalMove) {
            this.currentPiece.move('ArrowDown');
        }
      },
      800
    )
  }

  endGame () {
    clearInterval(this.completionInterval);
    clearInterval(this.descendInterval);
    console.log('game over');
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
    this.clearLineThenBringDown(i);
  }

  clearLineThenBringDown (i) {
    let cascade = new Promise((res)=>(res()));
    const whiteBlocks = [];

    for (let j = 0; j < 10; j++) {
      this.grid[i][j].graphics.clear();

      const whiteBlock = this.drawWhiteBlock(this.grid[i][j]);
      whiteBlocks.push(whiteBlock);

      this.grid[i][j] = false;
    }
    stage.update();

    this.clearWhiteBlocks(whiteBlocks, cascade);
    this.moveEverythingDown(i, cascade);
  }

  clearWhiteBlocks(whiteBlocks, cascade) {
    cascade = cascade.then(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          for (let i = 0; i < whiteBlocks.length; i++) {
            whiteBlocks[i].graphics.clear();
          }
          stage.update();
          resolve();
        }, 100)
      })
    })
  }

  moveEverythingDown(clearedRow, cascade) {
    for (let i = clearedRow - 1; i >= 0; i--) {
      for (let j = 0; j < 10; j++) {
        if (this.grid[i][j]) {
          const block = this.grid[i][j];
          cascade = cascade.then(() => {
            return new Promise((resolve) => {
              setTimeout(() => {
                block.y += BLOCK_WIDTH;
                stage.update();
                resolve();
              }, 50)
            })
          })
          this.grid[i+1][j] = this.grid[i][j];
          this.grid[i][j] = false;
        }
      }
    }
  }

  drawWhiteBlock(oldBlock) {
    const graphics = new createjs.Graphics()
      .beginFill("white")
      .beginStroke('black')
      .drawRect(0, 0, BLOCK_WIDTH, BLOCK_HEIGHT);

    const block = new createjs.Shape(graphics);
    block.x = oldBlock.x;
    block.y = oldBlock.y;
    stage.addChild(block)
    stage.update();
    return block;
  }

}
//TODO: FIX DRAWSIDE IN BASE PIECE AND NEXT THREE PIECES
