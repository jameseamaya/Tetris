import BasePiece from './base_piece';

export default class TPiece extends BasePiece {
  constructor(grid) {
    super(grid);

    this.letter = 't';
    this.sideX = 680;
    this.sideY = 252;
    this.sideDelta = 144;
  }

  getPositions (startPos) {
    const positions = [startPos];

    positions.push([startPos[0] - 1, startPos[1]])
    positions.push([startPos[0] - 2, startPos[1]])
    positions.push([startPos[0] - 1, startPos[1] + 1]);

    return positions;
  }

  getDeltas () {
    switch (this.rotation) {
      case 0:
        return [[0, -1], [1, 0], [2, 1], [0 ,1]];
      case 90:
        return [[1, -1], [0, 0], [-1, 1], [-1 ,-1]]
      case 180:
        return [[1, 2], [0, 1], [-1, 0], [1 ,0]]
      case 270:
        return [[-2, 0], [-1, -1], [0, -2], [0 ,0]]
      default:
        return;
    }
  }
}
