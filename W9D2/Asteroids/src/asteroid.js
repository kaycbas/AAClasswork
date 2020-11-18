const Util = require('./util');
const MovingObject = require('./moving_object');

function Asteroid(options) {
    options.color = "#E6E6FA";
    options.radius = 20;
    options.vel = Util.randomVec(2);
    MovingObject.call(this, options);
}

Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;