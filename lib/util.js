import IPiece from './pieces/i_piece';
import LPiece from './pieces/l_piece';
import JPiece from './pieces/j_piece';
import OPiece from './pieces/o_piece';
import SPiece from './pieces/s_piece';
import ZPiece from './pieces/z_piece';
import TPiece from './pieces/t_piece';

export function copyArr (positions) {
  const newArr = [];

  for (let i = 0; i < positions.length; i++) {
    newArr[i] = positions[i].slice();
  }

  return newArr;
}

export function outsideGrid (row, col) {
  if (row > 19 || col < 0 || col > 9) {
    return true;
  }
  return false;
}

export function drawBlock (posX, posY, letter) {
  const block = new createjs.Bitmap(`../images/${letter}_block.png`);

  block.graphics = {};
  block.graphics.clear = () => {
    block.visible = false;
  }

  block.image.onload = () => {
    block.x = posX;
    block.y = posY;

    stage.addChild(block);
    stage.update();
  }

  return block;
}

const PIECES = ['L', 'I', 'J', 'O', 'S', 'Z', 'T'];
export const DIRECTIONS = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

function getRandomType () {
  const index = Math.floor(Math.random() * 7);
  return PIECES[index];
}

export function createPiece (grid, type) {
  if (!type) {
    type = getRandomType();
  }
  // const type = 'I';

  switch (type) {
    case 'I':
      return new IPiece(grid);
    case 'L':
      return new LPiece(grid);
    case 'J':
      return new JPiece(grid);
    case 'O':
      return new OPiece(grid);
    case 'S':
      return new SPiece(grid);
    case 'Z':
      return new ZPiece(grid);
    case 'T':
      return new TPiece(grid);
    default:
      return;
  }
}
