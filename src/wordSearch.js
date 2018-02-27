import list from './list';
import wordUtils from './util/wordUtils';
import WORDSEARCHCONSTANTS from './constants/wordSearch';

const WordSearch = (wordList = list, rowInput = null, colInput = null) => {
  let cleanedWordList = wordUtils.removeNonCharactersAndUppercaseForArray(
    wordList
  );
  let words = wordUtils.sortBiggestToShortest(cleanedWordList);

  let rows = rowInput || words[0].length + 2;
  let cols = colInput || rows;

  let grid = wordUtils.makeHashGrid(rows, cols);

  //filler is a string with all words in it combined to match letter distribution
  let filler = words.reduce((x, y) => x + y);

  const updateGrid = (oldGrid, placement, word) => {
    let newGrid = oldGrid.slice(),
      { position, direction } = placement;

    for (let i = 0; i < word.length; i++) {
      newGrid[position] = word[i];
      position = WORDSEARCHCONSTANTS.dirNext[direction](position, cols);
    }

    return newGrid;
  };

  const checkToFit = (word, grid, direction, position) => {
    let endPosition = WORDSEARCHCONSTANTS.dirEnd[direction](
      wordUtils.rowColFromPos(position, cols),
      word.length - 1
    );
    if (
      endPosition.row < 0 ||
      endPosition.row >= rows ||
      endPosition.col < 0 ||
      endPosition.col >= cols
    ) {
      return false;
    }
    return true;
  };

  const checkNoCrashes = (word, grid, direction, position) => {
    let testPosition = position;
    for (let i = 0; i < word.length; i++) {
      if (grid[testPosition] !== '#' && grid[testPosition] !== word[i]) {
        return false;
      }
      testPosition = WORDSEARCHCONSTANTS.dirNext[direction](testPosition, cols);
    }
    return true;
  };

  const scanPlacements = (word, grid) => {
    let placements = [];
    for (let j = 0; j < grid.length; j++) {
      for (let k = 0; k < WORDSEARCHCONSTANTS.dirs.length; k++) {
        let direction = WORDSEARCHCONSTANTS.dirs[k];
        if (
          checkToFit(word, grid, direction, j) &&
          checkNoCrashes(word, grid, direction, j)
        ) {
          placements.push({ position: j, direction: direction });
        }
      }
    }
    return placements;
  };

  const getPositions = (placement, length) => {
    let positionArray = [],
      { position, direction } = placement;
    for (let i = 0; i < length; i++) {
      positionArray.push(position);
      position = WORDSEARCHCONSTANTS.dirNext[direction](position, cols);
    }
    return positionArray;
  };

  const createWordSearch = () => {
    let wordPositionsObject = {},
      error = false;
    grid = new Array(rows * cols).fill('#');
    for (let i = 0; i < words.length; i++) {
      let currentWord = words[i];
      let placements = scanPlacements(currentWord, grid);
      if (placements.length === 0) {
        error = true;
        break;
      } else {
        let idx = Math.floor(Math.random() * placements.length);
        grid = updateGrid(grid, placements[idx], currentWord);
        let wordPositions = getPositions(placements[idx], currentWord.length);
        wordPositionsObject[currentWord] = wordPositions;
      }
    }
    if (error) {
      return 'error';
    }
    grid = wordUtils.fillUpGrid(grid, filler);
    return { grid: grid, wordPositions: wordPositionsObject, rows: rows };
  };

  let response = null;

  const runWordSearch = () => {
    for (let i = 0; i < 3; i++) {
      let result = createWordSearch();
      if (result !== 'error') {
        response = result;
        break;
      }
      if (i === 2) {
        rows += 1;
        cols += 1;
        runWordSearch();
      }
    }
  };
  runWordSearch();
  return response;
};

export default WordSearch;
