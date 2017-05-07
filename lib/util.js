export function copyArr (positions) {
  const newArr = [];

  for (let i = 0; i < positions.length; i++) {
    newArr[i] = positions[i].slice();
  }

  return newArr;
}

export function randomColor() {
  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
  const index = Math.floor(Math.random() * 7);
  return colors[index];
}

export function outsideGrid (row, col) {
  if (row > 19 || col < 0 || col > 9) {
    return true;
  }
  return false;
}

export function drawBlock (posX, posY, color) {

  // const bmp = new Image();
  // bmp.image.onload = function() {
  //   const graphics = new createjs.Graphics()
  //     .beginBitmapFill(bmp)
  //     .beginStroke("white")
  //     .drawRect(posX, posY+100, BLOCK_WIDTH, BLOCK_HEIGHT);
  //
  //   const block = new createjs.Shape(graphics);
  //   block.posX = posX;
  //   block.posY = posY;
  //
  //   stage.addChild(block);
  //   stage.update();
  // }

  // const graphics = new createjs.Graphics()

  const block = new createjs.Bitmap('../images/i_block.png');
  block.graphics = {};
  block.graphics.clear = () => {
    block.visible = false;
  }
  block.image.onload = () => {
    // block.graphics
    // .beginBitmapFill(img)
    // .drawRect(posX, posY, BLOCK_WIDTH, BLOCK_HEIGHT);
    block.x = posX;
    block.y = posY;

    stage.addChild(block);
    stage.update();
  }

  block.posX = posX;
  block.posY = posY;
  return block;
  // const graphics = new createjs.Graphics()
  //   .beginFill(color)
  //   .beginStroke("white")
  //   .drawRect(posX, posY, BLOCK_WIDTH, BLOCK_HEIGHT);
  //
  // const block = new createjs.Shape(graphics);
  // block.posX = posX;
  // block.posY = posY;
  // stage.addChild(block);
  // stage.update();
  // return block;
}
