import React, { Component } from 'react'

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

  const removeNonCharactersAndUppercase = (string) => {
    return string.replace(/[\W_]/g, '').toUpperCase()
  }

class WordSearchDisplay extends Component {

  displayLetter(letter, position) {
    let positions = this.props.showPositions
    if ( positions && positions.includes(position) ) {
      return (
        <div className="letter-highlight" key={position}>
          {letter}
        </div>
      )
    }
    return (
      <div className="letter" key={position}>
        {letter}
      </div>
    )
  }

  displayRow(row, index, rows) {
    let rowStart = index * rows
    return (
      <div className="row" key={index}>
        {row.map((letter, index) => this.displayLetter(letter, index + rowStart))}
      </div>
    )
  }

  displayGrid(grid, rows) {
    const chunkedGrid = chunk(grid, rows)
    return (
      <div className="grid">
        {chunkedGrid.map((row, index) => this.displayRow(row, index, rows))}
      </div>
    )
  }

  displayWord(word) {
    if (this.props.hoverWord === removeNonCharactersAndUppercase(word)) {
      console.log('match!');
      return(
        <div key={word}
          className="word-highlighted"
          onMouseEnter={this.props.changeHoverWord}
          onMouseLeave={this.props.clearHoverWord}
          >{word}</div>
      )
    } else {
      return(
        <div key={word}
          className="word"
          onMouseEnter={this.props.changeHoverWord}
          onMouseLeave={this.props.clearHoverWord}
          >{word}</div>
      )
    }
  }

  displayWordList(wordList) {
    return (
      <div>
        <h2 className="word-list-header">Word List</h2>
        <div className="word-list">
          {wordList.map(word => this.displayWord(word))}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.displayGrid(this.props.results.grid, this.props.results.rows)}
        {this.displayWordList(this.props.wordList)}
      </div>
    )
  }
}

export default WordSearchDisplay
