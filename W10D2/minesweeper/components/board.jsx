import React from 'react';
import Tile from './tile';

class Board extends React.Component {
  constructor(props) {
      super(props);
  }

  render () {
    const rows = this.props.board.grid.map((row, idx1) => {
      const tiles = row.map((tile, idx2) => { //tile is tile object
        return (
          <Tile className='tile' key={idx2} tile={tile} updater={this.props.updater} /> //Tile is a react component. pass in tile object & updater so Tile has access to it.
          )
        })
      return (<div className='row' key={idx1}>{tiles}</div>);
    })

    return (
      <div>
          {rows}
      </div>
    )
  }
}

export default Board;