import React, { Component } from "react";
import "./App.css";
import WordSearch from "./wordSearch";
import WordSearchDisplay from "./WordSearchDisplay.react";
import DirectionPicker from "./components/DirectionPicker";
import Textarea from "react-textarea-autosize";
import httpUtils from "./util/httpUtils";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import copy from "copy-to-clipboard";
import wordUtils from "./util/wordUtils";
import CONSTANTS from "./constants/wordSearch";

const arrayToObject = arr => {
  let result = {};
  for (let item of arr) {
    result[item] = true;
  }
  return result;
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wordText: "cat\ndog\nbird",
      wordList: [],
      results: null,
      hoverWord: null,
      showPositions: null,
      url: null,
      canSave: false,
      saveDialogOpen: false,
      directions: arrayToObject(CONSTANTS.directions)
    };
  }

  componentWillMount() {
    if (this.props.match.params.id) {
      httpUtils.getGrid(this.props.match.params.id, this.loadGrid.bind(this));
      this.setState({
        url: `wordsearchmachine.com/${this.props.match.params.id}`
      });
    }
  }

  updateWords(e) {
    this.setState({ wordText: e.target.value, canSave: false });
  }

  makeWordSearch() {
    let wordList = this.state.wordText.split("\n");
    wordList = wordUtils.removeArrayRepeats(wordList);
    if (wordList.length > 0) {
      this.setState({
        results: WordSearch(wordList, this.state.directions),
        wordList: wordList,
        canSave: true,
        url: null
      });
    }
  }

  saveGrid() {
    httpUtils.postGrid(
      this.state.results.grid,
      this.state.results.rows,
      this.state.results.wordPositions,
      this.state.wordList,
      this.updateUrl.bind(this)
    );
  }

  updateUrl(id) {
    let path = "/" + id.data;
    window.history.pushState({ urlPath: path }, "", path);
    this.setState({
      url: `wordsearchmachine.com/${id.data}`,
      saveDialogOpen: true
    });
  }

  loadGrid(data) {
    let { grid, rows, wordList, wordPositions } = data;
    let results = { grid: grid, rows: rows, wordPositions: wordPositions };
    this.setState({
      results: results,
      wordList: wordList,
      wordText: wordList.join("\n")
    });
  }

  changeHoverWord(e) {
    let hoverWord = wordUtils.removeNonCharactersAndUppercase(
        e.target.innerHTML
      ),
      showPositions = this.state.results.wordPositions[hoverWord];
    this.setState({ hoverWord: hoverWord, showPositions: showPositions });
  }

  clearHoverWord(e) {
    this.setState({ hoverWord: "", showPositions: [] });
  }

  displayUrl() {
    if (this.state.url !== null) {
      return <div className="url">{this.state.url}</div>;
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
            showPositions={this.state.showPositions}
          />
        </div>
      );
    }
  }

  displaySaveButton() {
    if (this.state.canSave) {
      return (
        <div>
          <RaisedButton
            label="save"
            className="no-print button"
            primary={true}
            onClick={this.saveGrid.bind(this)}
          />
        </div>
      );
    }
  }

  displayPrintButton() {
    if (this.state.results) {
      return (
        <div>
          <RaisedButton
            label="print"
            className="no-print"
            primary={true}
            onClick={() => {
              window.print();
            }}
          />
        </div>
      );
    }
  }

  handleOpen = () => {
    this.setState({ saveDialogOpen: true });
  };

  handleClose = () => {
    this.setState({ saveDialogOpen: false });
  };

  handleCopy = () => {
    copy(this.state.url);
  };

  toggleDirection = direction => {
    let newDirections = this.state.directions;
    newDirections[direction] = !newDirections[direction];
    this.setState({ directions: newDirections });
  };

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
        <div className="controls no-print">
          <div className="input">
            <div>
              <div>Add your list of words here, separated by line breaks</div>
              <Textarea
                useCacheForDOMMeasurements
                value={this.state.wordText}
                className="word-input"
                onChange={this.updateWords.bind(this)}
              />
            </div>
            <DirectionPicker
              directions={this.state.directions}
              onClick={this.toggleDirection}
            />
          </div>
          <RaisedButton
            label="make a word search"
            primary={true}
            onClick={this.makeWordSearch.bind(this)}
          />
        </div>
        {this.displayResults()}
        <div className="buttons">
          {this.displaySaveButton()}
          {this.displayPrintButton()}
        </div>
        {this.displayUrl()}
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
