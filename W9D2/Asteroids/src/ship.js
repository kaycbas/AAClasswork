const MovingObject = require('./moving_object');
const Util = require('./util');

function Ship(options) {
    options.color = 'purple';
    options.radius = 15;
    options.vel = [0, 0];
    MovingObject.call(this, options);
}

Util.inherits(Ship, MovingObject);

module.export = Ship
