import React, { Component } from 'react';
import './App.css';
import WordSearch from "./wordSearch"
import WordSearchDisplay from './WordSearchDisplay.react'
import Textarea from "react-textarea-autosize";

const removeNonCharactersAndUppercase = (string) => {
  return string.replace(/[\W_]/g, '').toUpperCase()
}

const removeArrayRepeats = (array) => {
  let existingWords = {},
  result = []
  for (let i = 0; i < array.length; i++) {
    let cleanedWord = removeNonCharactersAndUppercase(array[i])
    if (!existingWords[cleanedWord]) {
      result.push(array[i])
      existingWords[cleanedWord] = true
    }
  }
  return result
}

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      wordText: "cat\ndog\nbird",
      wordList: [],
      results: null,
      hoverWord: null,
      showPositions: null
    }
  }

  updateWords(e) {
    this.setState({ wordText: e.target.value})
  }

  makeWordSearch() {
    let wordList = this.state.wordText.split("\n")
    wordList = removeArrayRepeats(wordList)
    this.setState({ results: WordSearch(wordList), wordList: wordList })
  }

  changeHoverWord(e) {
    let hoverWord = removeNonCharactersAndUppercase(e.target.innerHTML),
      showPositions = this.state.results.wordPositions[hoverWord]
    this.setState({ hoverWord: hoverWord, showPositions: showPositions })
  }

  clearHoverWord(e) {
    this.setState({ hoverWord: "", showPositions: [] })
  }

  render() {
    return (
      <div className="App">
        <div className='no-print'>
          <div>Add your list of words here, separated by line breaks</div>
          <div>
          <Textarea
            useCacheForDOMMeasurements
            value={this.state.wordText}
            className="word-input"
            onChange={this.updateWords.bind(this)}
            />
        </div>
          <div className="button-make" onClick={this.makeWordSearch.bind(this)}>make a word search</div>
        </div>
        {this.state.results && <WordSearchDisplay results={this.state.results} wordList={this.state.wordList}
        changeHoverWord={this.changeHoverWord.bind(this)}
        clearHoverWord={this.clearHoverWord.bind(this)}
        hoverWord={this.state.hoverWord}
        showPositions={this.state.showPositions} /> }
      </div>
    );
  }
}

export default App;
