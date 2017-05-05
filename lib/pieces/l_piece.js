// import BasePiece from './base_piece';
// import Block from '../block';
//
// export default class IPiece extends BasePiece{
//   constructor (pieceArgs) {
//     super(pieceArgs);
//     this.flat = true;
//     this.deltas = [
//       [this.posX,this.posY],
//       [this.posX+1,this.posY],
//       [this.posX+2,this.posY],
//       [this.posX+3,this.posY]
//     ];
//     this.createBlocks();
//   }
//
//   rotate () {
//     if (this.flat) {
//       this.deltas = [
//         [this.posX,this.posY],
//         [this.posX,this.posY+1],
//         [this.posX,this.posY+2],
//         [this.posX,this.posY+3]
//       ];
//       this.flat = false;
//     } else {
//       this.deltas = [
//         [this.posX,this.posY],
//         [this.posX+1,this.posY],
//         [this.posX+2,this.posY],
//         [this.posX+3,this.posY]
//       ];
//       this.flat = true;
//     }
//   }
//
//   createBlocks () {
//     for (let i = 0; i < 4; i++) {
//       this.blocks[i] = new Block(this.blockArgs);
//       this.blocks[i].posX = this.deltas[i][0];
//       this.blocks[i].posY = this.deltas[i][1];
//     }
//   }
//
//   updateDeltas () {
//     if (this.flat) {
//       this.deltas = [
//         [this.posX,this.posY],
//         [this.posX+1,this.posY],
//         [this.posX+2,this.posY],
//         [this.posX+3,this.posY]
//       ];
//     } else {
//       this.deltas = [
//         [this.posX,this.posY],
//         [this.posX,this.posY+1],
//         [this.posX,this.posY+2],
//         [this.posX,this.posY+3]
//       ];
//     }
//   }
// }
