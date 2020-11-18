const Asteroid = require("./asteroid");
const Ship = require("./ship");

function Game(){
    this.DIM_X = 700;
    this.DIM_Y = 600;
    this.NUM_ASTEROIDS = 4;
    this.asteroids = []
    this.addAsteroids()
    // this.ship = new Ship({})
}

Game.prototype.addAsteroids = function(){
    for (let i = 0; i < this.NUM_ASTEROIDS; i++) {
        const asteroid = new Asteroid({ 
            pos:this.randomPos(),
            game:this
             });
        this.asteroids.push(asteroid);
    }
}

Game.prototype.randomPos = function(){
    const x = Math.floor(Math.random() * this.DIM_X); 
    const y = Math.floor(Math.random() * this.DIM_Y);
    return [x,y];
}


Game.prototype.draw = function(ctx){
    ctx.clearRect(0,0,this.DIM_X,this.DIM_Y);
    this.asteroids.forEach(ast => {
        ast.draw(ctx)        
    });
}   

Game.prototype.moveObjects = function(){
    this.asteroids.forEach(ast => {
        ast.move()        
    });
}   

Game.prototype.wrap = function(pos){
    let wrappedX = pos[0] % this.DIM_X;
    let wrappedY = pos[1] % this.DIM_Y;
    if (wrappedX < 0) wrappedX = this.DIM_X;
    if (wrappedY < 0) wrappedY = this.DIM_Y;
    return [wrappedX,wrappedY];
}   

Game.prototype.checkCollisions = function() {
    for (let i = 0; i < this.asteroids.length; i++) {
        for (let j = 0; j < this.asteroids.length; j++) {
            if (i != j) {
                const asteroid1 = this.asteroids[i];
                const asteroid2 = this.asteroids[j];
                if (asteroid1.isCollidedWith(asteroid2)) {
                    asteroid1.collideWith(asteroid2);
                }
            }
        }
    }
}

Game.prototype.remove = function(asteroid) {
    this.asteroids.splice(this.asteroids.indexOf(asteroid), 1);
}

Game.prototype.step = function(){
    this.moveObjects();
    this.checkCollisions();
}

Game.prototype.allObjects = function(){
    return this.asteroids.concat([this.ship]);
}

module.exports = Game;