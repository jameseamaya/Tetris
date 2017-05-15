import {
  createPiece,
  getRandomType,
  DIRECTIONS,
  RUNNING,
  PAUSED,
  UNINITIALIZED,
  GAMEOVER
} from './util.js';


export default class Board {
  constructor () {
    this.grid = [];
    this.gameOver = false;
    this.currentPiece = null;
    window.handleKeydown = this.handleKeydown.bind(this);
    this.completionInterval = null;
    this.descendInterval = null;
    this.scoreInterval = null;
    this.nextThree = [];
    this.setupGrid();
    this.status = UNINITIALIZED;
    this.currentScore = 0;
    this.lastScore = 0;
    this.backToBackTetris = false;
    this.currentSpeed = 600;
    this.scoreDiv = document.querySelector('.current-score');
    this.scoreDiv.innerText = 0;

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
    this.drawSideCircles();
    this.currentPiece = createPiece(this.grid);
    this.getNextThreePieces();
    this.currentPiece.draw();
    this.addEventListeners();


    this.completionInterval = this.handlePieceCompletion();
    this.descendInterval = this.descendCurrentPiece();
    this.scoreInterval = this.updateScoreInterval();
    this.status = RUNNING;
  }

  pause () {
    this.status = PAUSED;
    document.removeEventListener('keydown', handleKeydown);
  }

  resume () {
    document.addEventListener('keydown', handleKeydown);
    this.status = RUNNING;

  }

  getNextThreePieces () {
    for (let i = 0; i < 3; i++) {
      const piece = createPiece(this.grid);
      this.nextThree.push(piece);
      piece.drawSide(i);
    }
  }

  getNextPiece () {
    const nextPiece = this.nextThree.shift();
    this.nextThree[0].moveToCircle(0);
    this.nextThree[1].moveToCircle(1);
    const lastPiece = createPiece(this.grid);
    lastPiece.drawSide(2);
    this.nextThree.push(lastPiece);
    return nextPiece;
  }

  drawSideCircles () {
    const circle1 = new createjs.Shape();
    circle1.graphics.beginFill('black')
    .drawCircle(825,210, 70);
    stage.addChild(circle1);
    const circle2 = new createjs.Shape();
    circle1.graphics.beginFill('black')
    .drawCircle(825,353, 70);
    stage.addChild(circle1);
    const circle3 = new createjs.Shape();
    circle1.graphics.beginFill('black')
    .drawCircle(825,496, 70);
    stage.addChild(circle1);
    stage.update();
  }

  handlePieceCompletion() {
    return setInterval(
      () => {
        if (this.currentPiece.gameOver) {
          this.endGame();
        } else if (this.status === PAUSED) {
          return;
        } else if (this.currentPiece.finalMove) {
          this.clearLines();
          this.currentPiece = this.getNextPiece();
          this.currentPiece.moveSideToTop();
          this.addEventListeners();
        }
      },
      10
    );
  }

  descendCurrentPiece () {
    return setInterval(
      () => {
        if (this.status === PAUSED) {
          return;
        } else if (!this.currentPiece.gameOver &&
                    !this.currentPiece.finalMove
                  ) {
            this.currentPiece.move('ArrowDown');
        }
      },
      this.currentSpeed
    )
  }

  updateScoreInterval () {
    return setInterval(() => {
      if (this.lastScore < this.currentScore) {
        this.lastScore += 10;
        this.scoreDiv.innerText = this.lastScore;
      }
    }, 50);
  }

  endGame () {
    clearInterval(this.completionInterval);
    clearInterval(this.descendInterval);
    clearInterval(this.scoreInterval);
    document.removeEventListener('keydown', handleKeydown);
    this.status = GAMEOVER
    document.querySelector('.gameover').classList.remove('hide-div');
  }

  draw () {
    const graphics = new createjs.Graphics()
      .beginFill("black").drawRect(
        BOARD_X, BOARD_Y, BOARD_WIDTH, BOARD_HEIGHT
      );
    this.boardRect = new createjs.Shape(graphics);

    stage.addChild(this.boardRect);
    stage.update();
  }

  addEventListeners () {
    document.addEventListener('keydown', handleKeydown);
  }

  handleKeydown (e) {

    if (DIRECTIONS.includes(e.code)) {
      e.preventDefault();
      this.currentPiece.move(e.code);
    }
  }

  clearLines () {
    let linesCleared = 0;

    for (let i = 19; i >= 0; i--) {
      while (this.shouldClearLine(i)) {
        this.clearLine(i);
        linesCleared++;
      }
    }
    if (linesCleared > 0) {
      this.updateScore(linesCleared);
    }
  }

  updateScore (linesCleared) {
    let points;
    if (linesCleared === 4) {
      if (this.backToBackTetris) {
        points = 1200;
      } else {
        points = 800;
        this.backToBackTetris = true;
      }
    } else {
      points = linesCleared * 100;
      this.backToBackTetris = false;
    }

    this.currentScore += points;
    clearInterval(this.descendInterval);
    const level = this.currentScore / 250;

    if (level < 11) {
      this.currentSpeed = 600 - level * 48;
    }

    this.descendInterval = this.descendCurrentPiece();
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
      stage.removeChild(this.grid[i][j]);

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
            stage.removeChild(whiteBlocks[i]);
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
