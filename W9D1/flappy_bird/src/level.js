export default class Level {
  constructor(dimensions) {
    this.dimensions = dimensions;
  }

  drawBackground(ctx) {
    let bgImg = new Image();
    bgImg.src = './assets/background.png';
    bgImg.onload = () => {
        ctx.drawImage(bgImg, 0, 0, this.dimensions.width, this.dimensions.height);
    };
  }

  animate(ctx) {
    this.drawBackground(ctx)
  }
}
