import React, { Component } from 'react';
import './App.css';
import WordSearch from "./wordSearch"
import WordSearchDisplay from './WordSearchDisplay.react'
import Textarea from "react-textarea-autosize";
import utils from './util'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import copy from 'copy-to-clipboard';

const removeNonCharactersAndUppercase = (string) => {
  return string.replace(/[\W_]/g, '').toUpperCase()
}

const removeArrayRepeats = (array) => {
  let existingWords = {},
  result = []
  for (let i = 0; i < array.length; i++) {
    let cleanedWord = removeNonCharactersAndUppercase(array[i])
    if (!existingWords[cleanedWord] && cleanedWord.length > 0) {
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
      showPositions: null,
      url: null,
      canSave: false,
      saveDialogOpen: false
    }
  }

  componentWillMount() {
    if (this.props.match.params.id) {
      utils.getGrid(this.props.match.params.id, this.loadGrid.bind(this))
      this.setState({ url: `wordsearchmachine.com/${this.props.match.params.id}`})
    }
  }

  updateWords(e) {
    this.setState({ wordText: e.target.value, canSave: false })
  }

  makeWordSearch() {
    let wordList = this.state.wordText.split("\n")
    wordList = removeArrayRepeats(wordList)
    if (wordList.length > 0) {
      this.setState({ results: WordSearch(wordList), wordList: wordList, canSave: true, url: null })
    }
  }

  saveGrid() {
    utils.postGrid(this.state.results.grid, this.state.results.rows, this.state.results.wordPositions, this.state.wordList, this.updateUrl.bind(this))
  }

  updateUrl(id) {
    let path = "/" + id.data
    window.history.pushState({urlPath:path},"",path)
    this.setState({url: `wordsearchmachine.com/${id.data}`, saveDialogOpen: true})
  }

  loadGrid(data) {
    let {grid, rows, wordList, wordPositions} = data
    let results = { grid: grid, rows: rows, wordPositions: wordPositions }
    this.setState({ results: results, wordList: wordList, wordText: wordList.join('\n')  })
  }

  changeHoverWord(e) {
    let hoverWord = removeNonCharactersAndUppercase(e.target.innerHTML),
      showPositions = this.state.results.wordPositions[hoverWord]
    this.setState({ hoverWord: hoverWord, showPositions: showPositions })
  }

  clearHoverWord(e) {
    this.setState({ hoverWord: "", showPositions: [] })
  }

  displayUrl() {
    if (this.state.url !== null) {
      return (
        <div>{this.state.url}</div>
      )
    }
  }

  displayResults() {
    if (this.state.results) {
      return (
        <div>
          <WordSearchDisplay
            results={this.state.results}
            wordList={this.state.wordList}
            changeHoverWord={this.changeHoverWord.bind(this)}
            clearHoverWord={this.clearHoverWord.bind(this)}
            hoverWord={this.state.hoverWord}
            showPositions={this.state.showPositions} />
        </div>
      )
    }
  }

  displaySaveButton() {
    if (this.state.canSave) {
      return (
        <div>
          <RaisedButton  label="save" className="no-print" primary={true} onClick={this.saveGrid.bind(this)} />
        </div>
      )
    }
  }

  handleOpen = () => {
    this.setState({saveDialogOpen: true});
  };

  handleClose = () => {
    this.setState({saveDialogOpen: false});
  };

  handleCopy = () => {
    copy(this.state.url)
  }

  render() {

    const actions = [
      <FlatButton
        label="Copy to clipboard"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleCopy.bind(this)}
      />,
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.handleClose.bind(this)}
        />
    ];


    return (
      <div className="App">
        <div className='controls no-print'>
          <div>Add your list of words here, separated by line breaks</div>
          <div>
            <Textarea
              useCacheForDOMMeasurements
              value={this.state.wordText}
              className="word-input"
              onChange={this.updateWords.bind(this)}
              />
          </div>
          <RaisedButton  label="make a word search" primary={true} onClick={this.makeWordSearch.bind(this)} />
        </div>
        {this.displayResults()}
        {this.displayUrl()}
        {this.displaySaveButton()}
        <Dialog
             title="Your word search has been saved"
             modal={false}
             actions={actions}
             open={this.state.saveDialogOpen}
             onRequestClose={this.handleClose}
           >

             Use this URL to come back to it: {this.state.url}
          </Dialog>
      </div>
    );
  }
}

export default App;
