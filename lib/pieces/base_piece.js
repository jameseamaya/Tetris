import {
  copyArr,
  randomColor,
  outsideGrid,
  drawBlock
} from '../util';

export default class BasePiece {
  constructor (grid) {
    this.startPos = [-1, 4];
    this.grid = grid;
    this.blocks = [];
    this.finalMove = false;
    this.gameOver = false;
    this.allPositions = this.getPositions(this.startPos);
    this.rotation = 0;
    this.drawCondition = this.drawCondition.bind(this);
    this.drawConditionDown = this.drawConditionDown.bind(this);
  }


  draw () {
    for (let i = 0; i < this.allPositions.length; i++) {
      const pos = this.allPositions[i];
      const posX = BOARD_X + pos[1] * BLOCK_WIDTH;
      const posY = BOARD_Y + pos[0] * BLOCK_WIDTH;
      this.blocks[i] = drawBlock(posX, posY, this.letter);
    }
  }

  drawSide(distance) {
    for (let i = 0; i < this.allPositions.length; i++) {
      const pos = this.allPositions[i];
      const posX = pos[1] * BLOCK_WIDTH + 650;
      const posY = pos[0] * BLOCK_WIDTH + distance;
      this.blocks[i] = drawBlock(posX, posY, this.letter);
    }
  }

  move (direction) {
    switch (direction) {
      case 'ArrowDown':
        this.generalMove(0, 1, [0, 1], this.drawConditionDown);
        break;
      case 'ArrowRight':
        this.generalMove(1, 1, [1, 0], this.drawCondition);
        break;
      case 'ArrowLeft':
        this.generalMove(1, -1, [-1, 0], this.drawCondition);
        break;
      case 'ArrowUp':
        this.rotate();
        return;
      default:
        return;
    }
  }

  generalMove (index, posDelta, blocksDelta, conditionMethod) {
    const previousPositions = copyArr(this.allPositions);

    for (let i = 0; i < this.allPositions.length; i++) {
      this.allPositions[i][index] += posDelta;
    }

    if (conditionMethod(previousPositions)) {
      return;
    }

    this.updateBlocks(blocksDelta);
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
      this.finalizeBlocks();
      this.finalMove = true;
      return true;
    } else if (this.outOfBounds()) {
      this.allPositions = previousPositions;
      return true;
    }
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

  onTopOfBlock (row, col) {
    if (this.grid[row] && this.grid[row][col]) {
      return true;
    }
  }

  updateBlocks (delta) {
    for (let i = 0; i < this.blocks.length; i++) {
      this.blocks[i].x += BLOCK_WIDTH * delta[0];
      this.blocks[i].y += BLOCK_HEIGHT * delta[1];
    }
    stage.update();
  }

  finalizeBlocks () {
    for (let i = 0; i < this.allPositions.length; i++) {
      const pos = this.allPositions[i];
      const posX = BOARD_X + pos[1] * BLOCK_WIDTH;
      const posY = BOARD_Y + pos[0] * BLOCK_HEIGHT;
      this.blocks[i].x = posX;
      this.blocks[i].y = posY;
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


  rotate () {
    const previousPositions = copyArr(this.allPositions);
    const deltas = this.getDeltas();

    this.updateAllPositions(deltas);

    if (this.drawCondition(previousPositions)) {
      return;
    }

    this.rotation = (this.rotation + 90) % 360;
    this.updateRotationBlocks(deltas);
  }

  updateAllPositions(deltas) {
    for (let i = 0; i < this.allPositions.length; i++) {
      this.allPositions[i][0] += deltas[i][1];
      this.allPositions[i][1] += deltas[i][0];
    }
  }

  updateRotationBlocks (deltas) {
    for (let i = 0; i < this.blocks.length; i++) {
      this.blocks[i].x += BLOCK_WIDTH * deltas[i][0];
      this.blocks[i].y += BLOCK_HEIGHT * deltas[i][1];
    }

    stage.update();
  }
}
