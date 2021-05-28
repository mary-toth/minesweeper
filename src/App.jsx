import React, { Component } from 'react'

export class App extends Component {
  state = {
    board: [
      ['', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ],
    difficulty: 0,
    id: null,
  }

  handleNewGame = async () => {
    const body = { difficulty: 0 }

    const response = await fetch(
      `https://minesweeper-api.herokuapp.com/games`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      }
    )
    const game = await response.json()

    this.setState(game)
  }

  handleClickCell = async (rowIndex, colIndex) => {
    const body = { row: rowIndex, col: colIndex }

    const response = await fetch(
      `https://minesweeper-api.herokuapp.com/games/${this.state.id}/check`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      }
    )
    const game = await response.json()
    this.setState(game)
  }

  handleRightClickCell = async (rowIndex, colIndex, event) => {
    const body = { row: rowIndex, col: colIndex }
    event.preventDefault()

    const response = await fetch(
      `https://minesweeper-api.herokuapp.com/games/${this.state.id}/flag`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      }
    )
    const game = await response.json()
    this.setState(game)
  }

  componentDidMount() {
    this.handleNewGame()
  }

  render() {
    return (
      <main>
        {/* <style>
          @import
          url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
        </style> */}
        <header>
          <h1>minesweeper </h1>

          <h2>
            <button onClick={this.handleNewGame}>new game</button>
          </h2>
        </header>
        <ul>
          {this.state.board.map((row, rowIndex) => {
            return row.map((cell, colIndex) => {
              return (
                <li
                  key={colIndex}
                  onClick={() => this.handleClickCell(rowIndex, colIndex)}
                  onContextMenu={event =>
                    this.handleRightClickCell(rowIndex, colIndex, event)
                  }
                >
                  {cell}
                </li>
              )
            })
          })}
        </ul>
      </main>
    )
  }
}
