import BasePiece from './base_piece';

export default class SPiece extends BasePiece {
  constructor(grid) {
    super(grid);

    this.letter = 's';
    this.sideX = 661;
    this.sideY = 238;
    this.sideDelta = 144;
  }

  getPositions (startPos) {
    const positions = [startPos];

    positions.push([startPos[0], startPos[1] + 1])
    positions.push([startPos[0] - 1, startPos[1] + 1])
    positions.push([startPos[0] - 1, startPos[1] + 2]);

    return positions;
  }

  getDeltas () {
    switch (this.rotation) {
      case 0:
        return [[0, -2], [-1, -1], [0, 0], [-1 , 1]]
      case 90:
        return [[0, 2], [1, 1], [0, 0], [1 , -1]]
      case 180:
        return [[0, -2], [-1, -1], [0, 0], [-1 , 1]]
      case 270:
        return [[0, 2], [1, 1], [0, 0], [1 , -1]]
      default:
        return;
    }
  }
}
