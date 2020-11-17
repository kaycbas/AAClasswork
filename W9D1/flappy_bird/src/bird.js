export default class Bird {
    constructor(dimensions) {
        this.gravity = 0.01;
        this.velocity = 0;
        this.dimensions = dimensions;
        this.x = dimensions.width / 3;
        this.y = dimensions.height / 2;
    }

    drawBird(ctx) {
        let birdImage = new Image();
        birdImage.src = './assets/bird.png';
        birdImage.onload = () => {
            ctx.drawImage(birdImage, this.x, this.y, 50, 50);
        };
    }

    animate(ctx) {
        this.move()
        this.drawBird(ctx);
        // setInterval(() => {
        //   requestAnimationFrame(this.animate(ctx));
        // }, 250);
    }

    move() {
      this.velocity += this.gravity;
      this.y += this.velocity;
    }

    flap() {
      this.velocity = -8;
    }

}