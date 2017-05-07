import {
  copyArr,
  randomColor,
  outsideGrid,
  drawBlock
} from '../util';

export default class BasePiece {
  constructor (grid) {
    this.grid = grid;
    this.startPos = [-1, 4];
    this.blocks = [];
    this.finalMove = false;
    this.gameOver = false;
  }

  outOfBounds () {
    for (let i = 0; i < this.allPositions.length; i++) {
      let row = this.allPositions[i][0];
      let col = this.allPositions[i][1];
      if (outsideGrid(row, col)) {
        return true;
      }
      if (this.onTopOfBlock(row, col)) {
        return true;
      }
    }
    return false;
  }

  draw () {
    //ONLY FOR FUN
    const color = randomColor();
    //ONLY FOR FUN

    for (let i = 0; i < this.allPositions.length; i++) {
      const pos = this.allPositions[i];
      const posX = BOARD_X + pos[1] * BLOCK_WIDTH;
      const posY = BOARD_Y + pos[0] * BLOCK_WIDTH;
      this.blocks[i] = drawBlock(posX, posY, color);
    }
  }

  move(direction) {
    switch (direction) {
      case 'ArrowDown':
        this.moveDown();
        break;
      case 'ArrowRight':
        this.moveRight();
        break;
      case 'ArrowLeft':
        this.moveLeft();
        break;
      case 'ArrowUp':
        this.rotate();
        return;
      default:
        return;
    }
  }

  moveDown () {
    const previousPositions = copyArr(this.allPositions);

    for (let i = 0; i < this.allPositions.length; i++) {
      this.allPositions[i][0] += 1;
    }

    if (this.drawConditionDown(previousPositions)) {
      return;
    }

    const delta = [0, 1];

    this.updateBlocks(delta);
  }

  moveRight () {
    const previousPositions = copyArr(this.allPositions);

    for (let i = 0; i < this.allPositions.length; i++) {
      this.allPositions[i][1] += 1;
    }
    if (this.drawCondition(previousPositions)) {
      return;
    }
    const delta = [1, 0];

    this.updateBlocks(delta);
  }

  moveLeft () {
    const previousPositions = copyArr(this.allPositions);

    for (let i = 0; i < this.allPositions.length; i++) {
      this.allPositions[i][1] -= 1;
    }

    if (this.drawCondition(previousPositions)) {
      return;
    }

    const delta = [-1, 0];

    this.updateBlocks(delta);
  }

  updateBlocks (delta) {
    for (let i = 0; i < this.blocks.length; i++) {
      this.blocks[i].x += BLOCK_WIDTH * delta[0];
      this.blocks[i].y += BLOCK_HEIGHT * delta[1];
    }
    stage.update();
  }

  tooClose () {
    for (let i = 0; i < this.allPositions.length; i++) {
      let row = this.allPositions[i][0];
      let col = this.allPositions[i][1];
      if (row < 0) {
        continue;
      } else if (row >= 20 || this.grid[row][col]) {
        return true;
      }
    }
    return false;
  }

  drawCondition (previousPositions) {
    if (this.outOfBounds()) {
      this.allPositions = previousPositions;
      return true;
    }

    return false;
  }

  drawConditionDown (previousPositions) {
    if (this.tooClose()) {
      this.allPositions = previousPositions;
      document.removeEventListener('keydown', handleKeydown);
      this.setPositionsOnGrid();
      this.finalMove = true;
      return true;
    } else if (this.outOfBounds()) {
      this.allPositions = previousPositions;
      return true;
    }
  }

  setPositionsOnGrid () {
    for (let i = 0; i < this.allPositions.length; i++) {
      const row = this.allPositions[i][0];
      const col = this.allPositions[i][1];
      if (!this.grid[row]) {
        this.gameOver = true;
        return;
      }
      this.grid[row][col] = this.blocks[i];
    }
  }

  onTopOfBlock (row, col) {
    if (this.grid[row] && this.grid[row][col]) {
      return true;
    }
  }
}
