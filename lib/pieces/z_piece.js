import BasePiece from './base_piece';

export default class ZPiece extends BasePiece {
  constructor(grid) {
    super(grid);

    this.letter = 'z';
    this.sideX = 660;
    this.sideY = 239;
    this.sideDelta = 144;
  }

  getPositions (startPos) {
    const positions = [[startPos[0] - 1, startPos[1]]];

    positions.push([startPos[0] - 1, startPos[1] + 1])
    positions.push([startPos[0], startPos[1] + 1])
    positions.push([startPos[0], startPos[1] + 2]);

    return positions;
  }

  getDeltas () {
    switch (this.rotation) {
      case 0:
        return [[1, -1], [0, 0], [-1, -1], [-2 ,0]]
      case 90:
        return [[-1, 1], [0, 0], [1, 1], [2 ,0]]
      case 180:
        return [[1, -1], [0, 0], [-1, -1], [-2 ,0]]
      case 270:
        return [[-1, 1], [0, 0], [1, 1], [2 ,0]]
      default:
        return;
    }
  }
}
