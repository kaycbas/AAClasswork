/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/asteroid.js":
/*!*************************!*\
  !*** ./src/asteroid.js ***!
  \*************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\n\nfunction Asteroid(options) {\n    options.color = \"#E6E6FA\";\n    options.radius = 20;\n    options.vel = Util.randomVec(2);\n    MovingObject.call(this, options);\n}\n\nUtil.inherits(Asteroid, MovingObject);\n\nmodule.exports = Asteroid;\n\n//# sourceURL=webpack:///./src/asteroid.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 78:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Asteroid = __webpack_require__(/*! ./asteroid */ \"./src/asteroid.js\");\nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\nfunction Game(){\n    this.DIM_X = 700;\n    this.DIM_Y = 600;\n    this.NUM_ASTEROIDS = 4;\n    this.asteroids = []\n    this.addAsteroids()\n    // this.ship = new Ship({})\n}\n\nGame.prototype.addAsteroids = function(){\n    for (let i = 0; i < this.NUM_ASTEROIDS; i++) {\n        const asteroid = new Asteroid({ \n            pos:this.randomPos(),\n            game:this\n             });\n        this.asteroids.push(asteroid);\n    }\n}\n\nGame.prototype.randomPos = function(){\n    const x = Math.floor(Math.random() * this.DIM_X); \n    const y = Math.floor(Math.random() * this.DIM_Y);\n    return [x,y];\n}\n\n\nGame.prototype.draw = function(ctx){\n    ctx.clearRect(0,0,this.DIM_X,this.DIM_Y);\n    this.asteroids.forEach(ast => {\n        ast.draw(ctx)        \n    });\n}   \n\nGame.prototype.moveObjects = function(){\n    this.asteroids.forEach(ast => {\n        ast.move()        \n    });\n}   \n\nGame.prototype.wrap = function(pos){\n    let wrappedX = pos[0] % this.DIM_X;\n    let wrappedY = pos[1] % this.DIM_Y;\n    if (wrappedX < 0) wrappedX = this.DIM_X;\n    if (wrappedY < 0) wrappedY = this.DIM_Y;\n    return [wrappedX,wrappedY];\n}   \n\nGame.prototype.checkCollisions = function() {\n    for (let i = 0; i < this.asteroids.length; i++) {\n        for (let j = 0; j < this.asteroids.length; j++) {\n            if (i != j) {\n                const asteroid1 = this.asteroids[i];\n                const asteroid2 = this.asteroids[j];\n                if (asteroid1.isCollidedWith(asteroid2)) {\n                    asteroid1.collideWith(asteroid2);\n                }\n            }\n        }\n    }\n}\n\nGame.prototype.remove = function(asteroid) {\n    this.asteroids.splice(this.asteroids.indexOf(asteroid), 1);\n}\n\nGame.prototype.step = function(){\n    this.moveObjects();\n    this.checkCollisions();\n}\n\nGame.prototype.allObjects = function(){\n    return this.asteroids.concat([this.ship]);\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

eval("function GameView(game, ctx) {\n    this.game = game;\n    this.ctx = ctx;\n}\n\nGameView.prototype.start = function() {\n    setInterval(() => {\n        this.game.step();\n        this.game.draw(this.ctx);\n    }, 20);\n}\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\nfunction MovingObject(options){\n    this.pos = options.pos;\n    this.vel = options.vel;\n    this.radius = options.radius;\n    this.color = options.color;\n    this.game = options.game;\n}\n\nMovingObject.prototype.draw = function(ctx) {\n    ctx.fillstyle = this.color;\n    ctx.beginPath();\n    let x = this.pos[0];\n    let y = this.pos[1];\n    ctx.arc(x, y, this.radius, 0, 2 * Math.PI, true);\n    ctx.fill();\n}\n\nMovingObject.prototype.move = function(){\n    let dx = this.vel[0];\n    let dy = this.vel[1];\n    this.pos = this.game.wrap(this.pos)\n    this.pos[0] += dx\n    this.pos[1] += dy\n}\n\n\nMovingObject.prototype.isCollidedWith = function(otherObject){\n    const distBetween = Util.dist(this.pos, otherObject.pos);\n    if(distBetween <= (this.radius + otherObject.radius)) return true;\n    return false\n}\n\nMovingObject.prototype.collideWith = function(otherObject) {\n    this.game.remove(this);\n    this.game.remove(otherObject);\n}\n\n// let mo1 = new MovingObject({\n//     pos: [30,30],\n//     vel: [5,5],\n//     radius: 10,\n//     color: \"red\"\n// })\n\n// let mo2 = new MovingObject({\n//     pos: [50,50],\n//     vel: [5,5],\n//     radius: 10,\n//     color: \"red\"\n// })\n\n// console.log(mo1.isCollidedWith(mo2))\n\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module.loaded, module.id, module, __webpack_require__.nmd, __webpack_require__, __webpack_require__.* */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/* module decorator */ module = __webpack_require__.nmd(module);\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\nfunction Ship(options) {\n    options.color = 'purple';\n    options.radius = 15;\n    options.vel = [0, 0];\n    MovingObject.call(this, options);\n}\n\nUtil.inherits(Ship, MovingObject);\n\nmodule.export = Ship\n\n\n//# sourceURL=webpack:///./src/ship.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

eval("const Util = {\n    inherits(childClass, parentClass){\n        let Surrogate = function(){};\n        Surrogate.prototype = parentClass.prototype;\n        childClass.prototype = new Surrogate();\n        childClass.prototype.constructor = childClass;\n    },\n    // Return a randomly oriented vector with the given length.\n    randomVec(length) {\n        const deg = 2 * Math.PI * Math.random();\n        return Util.scale([Math.sin(deg), Math.cos(deg)], length);\n    },\n    // Scale the length of a vector by the given amount.\n    scale(vec, m) {\n        return [vec[0] * m, vec[1] * m];\n    },\n\n    dist(pos1,pos2){\n        // console.log(pos1)\n        // console.log(pos2)\n        let x_1, y_1, x_2, y_2;\n        x_1 = pos1[0]\n        y_1 = pos1[1]\n        x_2 = pos2[0]\n        y_2 = pos2[1]\n       return  Math.sqrt((x_1 - x_2) ** 2 + (y_1 - y_2) ** 2)\n    }\n}\n\nmodule.exports = Util;\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__ */
eval("const GameView = __webpack_require__(/*! ./game_view.js */ \"./src/game_view.js\");\nconst Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\")\nconst MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\nconst Asteroid = __webpack_require__(/*! ./asteroid.js */ \"./src/asteroid.js\");\nwindow.MovingObject = MovingObject;\nwindow.Asteroid = Asteroid;\n// console.log(\"Webpack is working or whatever\")\ndocument.addEventListener(\"DOMContentLoaded\", function() {\n    const canEle = document.getElementById('game-canvas');\n    const ctx = canEle.getContext('2d');\n    // const mo = new MovingObject({\n    //     pos: [30, 30],\n    //     vel: [10, 10],\n    //     radius: 5,\n    //     color: \"#00FF00\"\n    //   });\n    // const asteroid = new Asteroid({\n    //     pos: [25, 30]\n    // });\n    // for (let i = 0; i < 2; i++) {\n    //     asteroid.move();\n    // }\n    // asteroid.draw(ctx)\n    const game = new Game();\n    const gameView = new GameView(game, ctx);\n    gameView.start();\n});\n\n\n\n//# sourceURL=webpack:///./src/index.js?");
})();

/******/ })()
;