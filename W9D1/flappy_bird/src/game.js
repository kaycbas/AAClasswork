import Bird from './bird';
import Level from './level';

export default class FlappyBird {
  constructor(canvas){
    canvas.addEventListener('click', click, false);
    this.ctx = canvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };
  }
  animate() {
    this.level.animate(this.ctx);
    // console.log(this.bird);
    this.bird.animate(this.ctx);
    if (this.running) window.requestAnimationFrame(animate);
  }

  restart() {
    this.level = new Level(this.dimensions)
    this.bird = new Bird(this.dimensions);
    this.running = false
    this.animate()
  }
  
  play() {
    this.running = true
    this.animate()
  }

  click() {
    // console.log('GKJL:DKJS:LKJ:FDJKF');
    if (this.running) this.play();
    this.bird.flap();
  }
}