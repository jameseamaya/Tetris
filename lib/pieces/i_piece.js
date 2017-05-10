import BasePiece from './base_piece';

export default class IPiece extends BasePiece {
  constructor(grid) {
    super(grid);

    this.letter = 'i';
    this.sideX = 690;
    this.sideY = 268;
    this.sideDelta = 144;
  }

  getPositions (startPos) {
    const positions = [startPos];

    for (let i = 1; i <= 3; i++) {
      positions.push([startPos[0] - i, startPos[1]])
    }

    return positions;
  }

  getDeltas () {
    switch (this.rotation) {
      case 0:
        return [[0, 0], [1, 1], [2, 2], [3 ,3]];
      case 90:
        return [[0, 0], [-1, -1], [-2, -2], [-3 ,-3]];
      case 180:
        return [[0, 0], [1, 1], [2, 2], [3 ,3]];
      case 270:
        return [[0, 0], [-1, -1], [-2, -2], [-3 ,-3]];
      default:
        return;
    }
  }
}
