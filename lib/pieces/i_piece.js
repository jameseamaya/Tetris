function copyArr (positions) {
  const newArr = [];

  for (let i = 0; i < positions.length; i++) {
    newArr[i] = positions[i].slice();
  }

  return newArr;
}

function insideGrid (pos) {
  if (pos[0] >=0 && pos[0] <= 20 && pos[1] >= 0 && pos[1] <= 10) {
    return true;
  }

  return false;
}

function drawBlock (posX, posY) {
  const graphics = new createjs.Graphics()
    .beginFill("red")
    .beginStroke("white")
    .drawRect(posX, posY, BLOCK_WIDTH, BLOCK_HEIGHT);
  const block = new createjs.Shape(graphics);
  stage.addChild(block);
  stage.update();
  return block;
}

export default class IPiece {
  constructor(grid) {
    this.grid = grid;
    this.startPos = [0, 4];
    this.allPositions = this.getPositions(this.startPos);
    this.blocks = [];
    this.flat = false;
    this.finalizeMove = false;
    this.finalMove = false;
  }

  descend () {
    const previousPositions = copyArr(this.allPositions);

    for (let i = 0; i < this.allPositions.length; i++) {
      this.allPositions[i][0] += 1;

      if (this.outOfBounds()) {
        this.active = false;
        this.allPositions = previousPositions;
        return;
      }
    }
    // debugger
  }

  getPositions (startPos) {
    const positions = [startPos];

    for (let i = 1; i <= 3; i++) {
      positions.push([startPos[0] - i, startPos[1]])
    }

    return positions;
  }

  outOfBounds () {
    for (let i = 0; i < this.allPositions.length; i++) {
      let row = this.allPositions[i][0];
      let col = this.allPositions[i][1];
      if (this.outsideGrid(row, col)) {
        return true;
      }
      if (this.onTopOfBlock(row, col)) {
        return true;
      }
    }
    return false;
  }

  draw () {
    for (let i = 0; i < this.allPositions.length; i++) {
      const pos = this.allPositions[i];
      const posX = BOARD_X + pos[1] * BLOCK_WIDTH;
      const posY = BOARD_Y + pos[0] * BLOCK_WIDTH;
      this.blocks[i] = drawBlock(posX, posY);
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
    // const previousPositions = copyArr(this.allPositions);
    //
    // for (let i = 0; i < this.allPositions.length; i++) {
    //   this.allPositions[i][0] += 1;
    // }
    //
    // if (this.drawCondition(previousPositions)) {
    //   return;
    // }
    //
    // const delta = [0, 1];
    //
    // this.updateBlocks(delta);
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

  rotate () {
    if (this.flat) {
      this.turnStraight();
    } else {
      this.turnFlat();
    }
  }

  turnStraight () {
    const previousPositions = copyArr(this.allPositions);

    for (let i = 0; i < this.allPositions.length; i++) {
      this.allPositions[i][0] -= i;
      this.allPositions[i][1] -= i;
    }

    if (this.drawCondition(previousPositions)) {
      return;
    }

    const delta = [-1, -1];
    this.flat = false;
    this.updateRotationBlocks(delta);
  }

  turnFlat () {
    const previousPositions = copyArr(this.allPositions);

    for (let i = 0; i < this.allPositions.length; i++) {
      this.allPositions[i][0] += i;
      this.allPositions[i][1] += i;

    }

    if (this.drawCondition(previousPositions)) {
      return;
    }
    const delta = [1, 1];
    this.flat = true;
    this.updateRotationBlocks(delta);
  }

  updateBlocks (delta) {
    if (this.finalizeMove) {
      this.finalMove = true;
      this.setPositionsOnGrid();
    }

    for (let i = 0; i < this.blocks.length; i++) {
      this.blocks[i].x += BLOCK_WIDTH * delta[0];
      this.blocks[i].y += BLOCK_HEIGHT * delta[1];
    }
    stage.update();
  }

  updateRotationBlocks (delta) {
    for (let i = 0; i < this.blocks.length; i++) {
      this.blocks[i].x += BLOCK_WIDTH * delta[0] * i;
      this.blocks[i].y += BLOCK_HEIGHT * delta[1] * i;
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
      this.finalMove = true;
      this.allPositions = previousPositions;
      document.removeEventListener('keydown', handleKeydown);
      this.setPositionsOnGrid();
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
      this.grid[row][col] = this.blocks[i];
    }
  }

  outsideGrid (row, col) {
    if (row > 19 || col < 0 || col > 9) {
      return true;
    }
    return false;
  }

  onTopOfBlock (row, col) {
    if (this.grid[row] && this.grid[row][col]) {
      return true;
    }
  }
}
//TODO: FINISH COLLISION
