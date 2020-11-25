import React from 'react'

class Tile extends React.Component {
  constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
  }

  tileText() {
    if (this.props.tile.explored) {
      if (this.props.tile.bombed) {
        return (<div className="explored">💣</div>)
      } else {
        let bombCount = this.props.tile.adjacentBombCount();
        bombCount = bombCount === 0 ? '' : bombCount;
        return (<div className="explored">{bombCount}</div>);
      }
    } else {
      if (this.props.tile.flagged) {
        return (<div className="unexplored">🚩</div>)
      } else {
        return (<div className="unexplored"></div>);
      }
    }
  }

  handleClick (e) {
    let flagging = e.altKey ? true : false
    this.props.updater(this.props.tile, flagging);
  }

  render() {
    let text = this.tileText();
    return (
      <div className="tile" onClick={this.handleClick}>
        {text}
      </div>
    )
  }
}

export default Tile;