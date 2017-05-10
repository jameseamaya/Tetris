import BasePiece from './base_piece';

export default class LPiece extends BasePiece {
  constructor(grid) {
    super(grid);

    this.letter = 'l';
    this.sideX = 678;
    this.sideY = 251;
    this.sideDelta = 144;
  }

  getPositions (startPos) {
    const positions = [startPos];

    for (let i = 1; i <= 2; i++) {
      positions.push([startPos[0] - i, startPos[1]])
    }
    positions.push([startPos[0], startPos[1] + 1]);

    return positions;
  }

  getDeltas () {
    switch (this.rotation) {
      case 0:
        return [[0, -1], [1, 0], [2, 1], [-1 ,0]]
      case 90:
        return [[1, -1], [0, 0], [-1, 1], [0 ,-2]]
      case 180:
        return [[1, 2], [0, 1], [-1, 0], [2 ,1]]
      case 270:
        return [[-2, 0], [-1, -1], [0, -2], [-1 ,1]]
      default:
        return;
    }
  }
}
