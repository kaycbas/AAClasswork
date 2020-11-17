import FlappyBird from './game';

const canvas = document.getElementById('bird-game');
const flappyGame = new FlappyBird(canvas);
flappyGame.restart();