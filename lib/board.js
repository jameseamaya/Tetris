import Block from './block';
import PieceController from './piece_controller';

const moveList = ['ArrowUp', 'ArrowLeft', 'ArrowRight', 'ArrowDown'];

export default class Board {
  constructor (boardArgs) {
    this.startX = boardArgs.startX;
    this.startY = boardArgs.startY;
    this.grid = [];
    this.gridBools = [];
    this.width = 280;
    this.height = 560;
    this.ctx = boardArgs.ctx;
    this.rows = 20;
    this.cols = 10;
    this.blockWidth = this.width / this.cols;
    this.blockHeight = this.height / this.rows;

    this.handleKeydown = this.handleKeydown.bind(this);
    this.addEventListeners();
    this.pieceArgs = {
      startX: this.startX,
      startY: this.startY,
      blockWidth: this.blockWidth,
      blockHeight: this.blockHeight,
      posX: 0,
      posY: 0,
      ctx: this.ctx,
      gridBools: this.gridBools
    }
    //only for TESTING
    window.gridBools = this.gridBools
    //
    this.currentPiece = new PieceController(this.pieceArgs);
    this.pieces = [];
    this.initializeGrid(this.blockWidth, this.blockHeight);
  }

  initializeGrid (blockWidth, blockHeight) {
    let blockArgs = {
      startX: this.startX,
      startY: this.startY,
      blockWidth,
      blockHeight,
      ctx: this.ctx,
    }

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (!this.grid[i]) {
          this.grid[i] = [];
          this.gridBools[i] = [];
        }
        blockArgs.posX = j;
        blockArgs.posY = i;
        this.grid[i][j] = new Block(blockArgs);
        this.gridBools[i][j] = false;
      }
    }

    this.draw();
  }

  addEventListeners() {
    document.addEventListener('keydown', this.handleKeydown);
  }

  handleKeydown (e) {
    if (moveList.includes(e.key)) {
      e.preventDefault();
    }

    if (this.currentPiece.frozen()) {
      this.pieces.unshift(this.currentPiece);
      this.introduceNewPiece();
      return;
    }


    this.redraw();
    this.currentPiece.move(e.key);
  }

  draw() {
    this.ctx.fillStyle = '#3fff5c';
    this.ctx.fillRect(this.startX,this.startY,this.width,this.height);
    this.ctx.strokeRect(this.startX,this.startY,this.width,this.height);
  }

  redraw() {
    this.ctx.clearRect(this.startX, this.startY, this.width, this.height);
    this.draw();
    for (let i = 0; i < this.pieces.length; i++) {
      this.pieces[i].draw();
    }
  }

  introduceNewPiece () {
    this.currentPiece = new PieceController(this.pieceArgs);
  }

  start () {
    this.currentPiece.draw();
  }
}
