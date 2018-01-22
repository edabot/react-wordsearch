import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import WordSearch from "./wordSearch"

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      wordText: ""
    }
  }

  componentDidMount() {
    WordSearch()
  }

  updateWords(e) {
    this.setState({ wordText: e.target.value})
  }

  makeWordSearch() {
    let wordList = this.state.wordText.split("\n")
    WordSearch(wordList)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div onClick={this.makeWordSearch.bind(this)}>make a word search</div>
        <textarea onChange={this.updateWords.bind(this)} value={this.state.wordText}/>
      </div>
    );
  }
}

export default App;
