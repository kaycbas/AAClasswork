import React from 'react';
import Board from './board';
import * as Minesweeper from '../minesweeper.js';

class Game extends React.Component {
    constructor(props) {
        super(props);
        let board = new Minesweeper.Board(9, 9);
        this.state = {board: board};
        this.updateGame = this.updateGame.bind(this);
    }

    updateGame(tile, flagging) {
      if (flagging) {
        tile.toggleFlag();
      } else {
          tile.explore();
      }
      this.setState({ board: this.state.board });
    }

    render() {
        if (this.state.board.won()) {
            return (
              <div className='modal'>
                <form className='modal-form'>
                  <h1>You Won!!!</h1>
                  <button>Play Again</button>
                </form>
                <div className='modal-screen'></div>
              </div>
            )
        } else if (this.state.board.lost()) {
            return (
              <div className='modal'>
                <form className='modal-form'>
                  <h1>You Lost!!!</h1>
                  <button>Play Again</button>
                </form>
                <div className='modal-screen'></div>
              </div>
            )
        } else {
            return (<Board board={this.state.board} updater={this.updateGame} />);
        }
    }
}

export default Game;