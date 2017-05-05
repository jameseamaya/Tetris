export default class Block {
  constructor (blockArgs) {
    this.startX = blockArgs.startX;
    this.startY = blockArgs.startY;
    this.blockWidth = blockArgs.blockWidth;
    this.blockHeight = blockArgs.blockHeight;
    this.posX = blockArgs.posX;
    this.posY = blockArgs.posY;
    this.ctx = blockArgs.ctx;
    this.gridBools = blockArgs.gridBools;
    this.finalize = false;
  }

  draw (type) {
    this.x = this.startX + this.posX * this.blockWidth;
    this.y = this.startY + this.posY * this.blockHeight;
    if (type === 'grid') {
      this.ctx.fillRect(this.x, this.y, this.blockWidth, this.blockHeight);

    } else {
      if (this.finalize && this.gridBools[this.posY]) {
        this.gridBools[this.posY][this.posX] = true;
      }
      this.ctx.fillRect(this.x, this.y, this.blockWidth, this.blockHeight);
      this.ctx.strokeRect(this.x, this.y, this.blockWidth, this.blockHeight);
    }
  }

  //ONLY FOR TESTING
  move (direction) {
    switch (direction) {
      case 'ArrowLeft':
        this.ctx.strokeStyle = '#51ffff';
        this.posX -= 1;
        this.draw();
        break;
      case 'ArrowRight':
        this.ctx.strokeStyle = '#51ffff';
        this.posX += 1;
        this.draw();
        break;
      case 'ArrowUp':
        this.ctx.strokeStyle = '#51ffff';
        this.posY -= 1;
        this.draw();
        break;
      case 'ArrowDown':
        this.ctx.strokeStyle = '#51ffff';
        this.posY += 1;
        this.draw();
        break;
      default:
        return;
    }
  }
}
