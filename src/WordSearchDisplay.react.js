import React, { Component } from 'react'

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

const displayRow = (row, index) => {
  return (
    <div className="row" key={index}>
      {row.map((letter, index) => <div className="letter" key={index}>{letter}</div>)}
    </div>
  )
}

const displayGrid = (grid, rows) => {
  const chunkedGrid = chunk(grid, rows)

  return (
    <div className="grid">
      {chunkedGrid.map((row, index) => displayRow(row, index))}
    </div>
  )
}

const displayWordList = (wordList) => {
  return (
    <div className="word-list">
      {wordList.map(word => <div key={word}>{word}</div>)}
    </div>
  )
}

class WordSearchDisplay extends Component {
  render() {
    return (
      <div>
        {displayGrid(this.props.results.grid, this.props.results.rows)}
        {displayWordList(this.props.wordList)}
      </div>
    )
  }
}

export default WordSearchDisplay
