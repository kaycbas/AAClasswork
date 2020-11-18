const Util = require("./util");

function MovingObject(options){
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
}

MovingObject.prototype.draw = function(ctx) {
    ctx.fillstyle = this.color;
    ctx.beginPath();
    let x = this.pos[0];
    let y = this.pos[1];
    ctx.arc(x, y, this.radius, 0, 2 * Math.PI, true);
    ctx.fill();
}

MovingObject.prototype.move = function(){
    let dx = this.vel[0];
    let dy = this.vel[1];
    this.pos = this.game.wrap(this.pos)
    this.pos[0] += dx
    this.pos[1] += dy
}


MovingObject.prototype.isCollidedWith = function(otherObject){
    const distBetween = Util.dist(this.pos, otherObject.pos);
    if(distBetween <= (this.radius + otherObject.radius)) return true;
    return false
}

MovingObject.prototype.collideWith = function(otherObject) {
    this.game.remove(this);
    this.game.remove(otherObject);
}

// let mo1 = new MovingObject({
//     pos: [30,30],
//     vel: [5,5],
//     radius: 10,
//     color: "red"
// })

// let mo2 = new MovingObject({
//     pos: [50,50],
//     vel: [5,5],
//     radius: 10,
//     color: "red"
// })

// console.log(mo1.isCollidedWith(mo2))

module.exports = MovingObject;