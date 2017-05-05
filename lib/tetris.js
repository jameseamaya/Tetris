import Game from './game';
// import GameView from './game_view';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('tetris');
  canvas.width = 600;
  canvas.height = 600;
  const gameWidth = canvas.width;
  const gameHeight = canvas.height;

  const ctx = canvas.getContext('2d');
});

// L
// let startX = 100;
// let startY = 100;
// let width = 30;
// let orientation;

// const lSquareDown = [[0,0], [1, 0], [2,0], [2,1]];
// const lSquareUp = [[0,0], [1, 0], [2,0], [2,-1]];
// const lSquareRight = [[0,0], [0, 1], [0,2], [1,2]];
// const lSquareLeft = [[0,0], [0, 1], [0,2], [-1,2]];
// const orientation = lSquareLeft;
//
// for (let i = 0; i < 4; i++) {
//   ctx.fillRect(
//     startX + width * orientation[i][0],
//     startY + width * orientation[i][1],
//     width, width
//   );
//   ctx.strokeRect(
//     startX + width * orientation[i][0],
//     startY + width * orientation[i][1],
//     width, width
//   );
// }

//O
// ctx.fillRect(20, 20, 30, 30);
// ctx.strokeRect(20, 20, 30, 30);
//
// ctx.fillRect(50, 20, 30, 30);
// ctx.strokeRect(50, 20, 30, 30);
//
// ctx.fillRect(20, 50, 30, 30);
// ctx.strokeRect(20, 50, 30, 30);
//
// ctx.fillRect(50, 50, 30, 30);
// ctx.strokeRect(50, 50, 30, 30);

//I
// ctx.fillRect(20, 20, 30, 30);
// ctx.strokeRect(20, 20, 30, 30);
//
// ctx.fillRect(20, 50, 30, 30);
// ctx.strokeRect(20, 50, 30, 30);
//
// ctx.fillRect(20, 80, 30, 30);
// ctx.strokeRect(20, 80, 30, 30);
//
// ctx.fillRect(20, 110, 30, 30);
// ctx.strokeRect(20, 110, 30, 30);

//T
// ctx.fillRect(20, 20, 30, 30);
// ctx.strokeRect(20, 20, 30, 30);
//
// ctx.fillRect(20, 50, 30, 30);
// ctx.strokeRect(20, 50, 30, 30);
//
// ctx.fillRect(50, 50, 30, 30);
// ctx.strokeRect(50, 50, 30, 30);
//
// ctx.fillRect(20, 80, 30, 30);
// ctx.strokeRect(20, 80, 30, 30);
