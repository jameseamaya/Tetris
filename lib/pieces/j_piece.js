import BasePiece from './base_piece';

export default class JPiece extends BasePiece {
  constructor(grid) {
    super(grid);

    this.letter = 'j';
    this.sideX = 671;
    this.sideY = 249;
    this.sideDelta = 144;
  }

  getPositions (startPos) {
    const positions = [];

    for (let i = 0; i <= 2; i++) {
      positions.push([startPos[0] - i, startPos[1] + 1])
    }
    positions.push([startPos[0], startPos[1]]);

    return positions;
  }

  getDeltas () {
    switch (this.rotation) {
      case 0:
        return [[-1, 0], [0, 1], [1, 2], [0 ,-1]]
      case 90:
        return [[0, -2], [-1, -1], [-2, 0], [1 ,-1]]
      case 180:
        return [[2, 1], [1, 0], [0, -1], [1 ,2]]
      case 270:
        return [[-1, 1], [0, 0], [1, -1], [-2 ,0]]
      default:
        return;
    }
  }
}
