import Block from '../block';

export default class BasePiece {
  constructor(pieceArgs) {
    this.pieceArgs = pieceArgs;
    this.startX = pieceArgs.startX;
    this.startY = pieceArgs.startY;
    this.blockWidth = pieceArgs.blockWidth;
    this.blockHeight = pieceArgs.blockHeight;
    this.ctx = pieceArgs.ctx;
    this.posX = pieceArgs.posX;
    this.posY = pieceArgs.posY;
    this.blockArgs = this.pieceArgs;
    // this.blockArgs = merge({}, this.pieceArgs);
    this.blocks = [];
    this.gridBools = pieceArgs.gridBools;
    this.finalize = false;
  }

  draw () {
    this.pieceArgs.ctx.fillStyle = '#875cff';
    for (let i = 0; i < 4; i++) {
      // debugger
      this.blocks[i].posX = this.deltas[i][0];
      this.blocks[i].posY = this.deltas[i][1];
      this.blocks[i].draw();
    }
  }

  move (direction) {
    switch (direction) {
      case 'ArrowLeft':
        // this.ctx.fillStyle = '#51ffff';
        this.posX -= 1;
        this.updateDeltas();
        if (this.outOfBounds()) {
          this.posX +=1;
          this.updateDeltas();
        }
        this.draw();
        break;
      case 'ArrowRight':
        // break;
        // this.ctx.fillStyle = '#51ffff';
        this.posX += 1;
        this.updateDeltas();
        if (this.outOfBounds()) {
          this.posX -=1;
          this.updateDeltas();
        }
        this.draw();
        break;
      case 'ArrowUp':
        // this.ctx.fillStyle = '#51ffff';
        this.rotate();
        this.updateDeltas();
        if (this.outOfBounds()) {
          this.reverseRotate();
          this.updateDeltas();
        }
        this.draw();
        break;
      case 'ArrowDown':
        // this.ctx.fillStyle = '#51ffff';
        this.posY += 1;
        this.updateDeltas();
        if (this.outOfBounds()) {
          this.posY -=1;
          this.updateDeltas();
        }
        this.draw();
        break;
      default:
        return;
    }
  }

  outOfBounds () {
    for (let i = 0; i < this.deltas.length; i++) {
      let x = this.deltas[i][0];
      let y = this.deltas[i][1];

      if (y === 19 || this.gridBools[y+1] && this.gridBools[y+1][x]) {
        this.freezePiece();
      }

      if (x < 0 || x > 9 || y > 19) {
        return true;
      }

      if (this.gridBools[y] && this.gridBools[y][x]) {
        return true;
      }

    }
    return false;
  }

  freezePiece () {
    this.finalize = true;
    for (let i = 0; i < this.blocks.length; i++) {
      this.blocks[i].finalize = true;
    }
  }
}
