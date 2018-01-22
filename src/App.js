import React, { Component } from 'react';
import './App.css';
import WordSearch from "./wordSearch"
import WordSearchDisplay from './WordSearchDisplay.react'
import Textarea from "react-textarea-autosize";

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      wordText: "cat\ndog\nbird",
      wordList: [],
      results: null
    }
  }

  updateWords(e) {
    this.setState({ wordText: e.target.value})
  }

  makeWordSearch() {
    let wordList = this.state.wordText.split("\n")
    this.setState({ results: WordSearch(wordList), wordList: wordList })
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
        {this.state.results && <WordSearchDisplay results={this.state.results} wordList={this.state.wordList} /> }
      </div>
    );
  }
}

export default App;