const GameView = require('./game_view.js');
const Game = require('./game.js')
const MovingObject = require("./moving_object.js");
const Asteroid = require('./asteroid.js');
window.MovingObject = MovingObject;
window.Asteroid = Asteroid;
// console.log("Webpack is working or whatever")
document.addEventListener("DOMContentLoaded", function() {
    const canEle = document.getElementById('game-canvas');
    const ctx = canEle.getContext('2d');
    // const mo = new MovingObject({
    //     pos: [30, 30],
    //     vel: [10, 10],
    //     radius: 5,
    //     color: "#00FF00"
    //   });
    // const asteroid = new Asteroid({
    //     pos: [25, 30]
    // });
    // for (let i = 0; i < 2; i++) {
    //     asteroid.move();
    // }
    // asteroid.draw(ctx)
    const game = new Game();
    const gameView = new GameView(game, ctx);
    gameView.start();
});

