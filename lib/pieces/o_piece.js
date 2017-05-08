import BasePiece from './base_piece';

export default class LPiece extends BasePiece {
  constructor(grid) {
    super(grid);

    this.letter = 'o';
  }

  getPositions (startPos) {
    const positions = [startPos];

    positions.push([startPos[0] - 1, startPos[1]])
    positions.push([startPos[0] - 1, startPos[1] + 1])
    positions.push([startPos[0], startPos[1] + 1]);

    return positions;
  }

  getDeltas () {
    switch (this.rotation) {
      case 0:
        return [[0, 0], [0, 0], [0, 0], [0 ,0]]
      case 90:
        return [[0, 0], [0, 0], [0, 0], [0 ,0]]
      case 180:
        return [[0, 0], [0, 0], [0, 0], [0 ,0]]
      case 270:
        return [[0, 0], [0, 0], [0, 0], [0 ,0]]
      default:
        return;
    }
  }
}
