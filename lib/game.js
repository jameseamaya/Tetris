import Board from './board';

export default class Game {
  constructor (width, height, ctx) {
    this.width = width;
    this.height = height;
    this.ctx = ctx;
  }

  run () {
    const boardArgs = {
      startX: this.width / 4,
      startY: 0,
      width: this.width,
      height: this.height,
      ctx: this.ctx
    };
    const board = new Board(boardArgs);
    board.start();
  }
}


// import Board from './board';
//
// export default class Game {
//   constructor (width, height, ctx) {
//     this.width = width;
//     this.height = height;
//     this.ctx = ctx;
//   }
//
//   run () {
//     const boardArgs = {
//       startX: this.width / 4,
//       startY: 0,
//       width: this.width,
//       height: this.height,
//       ctx: this.ctx
//     };
//     const board = new Board(boardArgs);
//     board.start();
//   }
// }
