import IPiece from './pieces/i_piece';
import LPiece from './pieces/l_piece';

export default class PieceController {
  constructor (pieceArgs) {
    this.pieceArgs = pieceArgs;
    const PIECES = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
    const index =  Math.floor(Math.random()*6);
    this.piece = this.createPiece(PIECES[0]);
  }

  draw () {
    // debugger
    this.piece.draw();
  }

  createPiece(type) {
    switch (type) {
      case 'I':
        return new IPiece(this.pieceArgs);
      case 'L':
        return new LPiece(this.pieceArgs);
      default:
        return;
    }
  }

  move (direction) {
    this.piece.move(direction);
  }

  frozen () {
    return this.piece.finalize;
  }
}
