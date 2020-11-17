Function.prototype.inherits = function(parentClass) {
    // const Surrogate = function() {};
    // Surrogate.prototype = parentClass.prototype;
    // this.prototype = new Surrogate();
    // this.prototype.constructor = this;

    // this.prototype = {...parentClass.prototype, constructor: this}
    this.prototype = Object.create(parentClass.prototype);
    this.prototype.constructor = this;
}

// let uniqes = [...new Set(arr)];

function MovingObject () {}

function Ship () {}
Ship.inherits(MovingObject);

function Asteroid () {}
Asteroid.inherits(MovingObject);

MovingObject.prototype.move = function() {
    console.log(`I'm moving`);
}

let s = new Ship();
let a = new Asteroid();

s.move();
a.move();

