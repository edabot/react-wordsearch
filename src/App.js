import React, { Component } from 'react';
import './App.css';
import WordSearch from "./wordSearch"
import WordSearchDisplay from './WordSearchDisplay.react'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      wordText: "",
      results: null
    }
  }

  updateWords(e) {
    this.setState({ wordText: e.target.value})
  }

  makeWordSearch() {
    let wordList = this.state.wordText.split("\n")
    this.setState({ results: WordSearch(wordList) })
  }

  render() {
    return (
      <div className="App">

        <div onClick={this.makeWordSearch.bind(this)}>make a word search</div>
        <textarea onChange={this.updateWords.bind(this)} value={this.state.wordText}/>
        {this.state.results && <WordSearchDisplay results={this.state.results} wordList={this.state.wordText.split("\n")} /> }
      </div>
    );
  }
}

export default App;
