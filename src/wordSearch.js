import list from "./list";
import wordUtils from "./util/wordUtils";
import WORDSEARCHCONSTANTS from "./constants/wordSearch";

const CROSSMULTIPLIER = 50;

const WordSearch = (wordList = list, rowInput = null, colInput = null) => {
  let cleanedWordList = wordUtils.removeNonCharactersAndUppercaseForArray(
    wordList
  );
  let words = wordUtils.sortBiggestToShortest(cleanedWordList);

  let rows = rowInput || words[0].length + 2;
  let cols = colInput || rows;

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
    let testPosition = position,
      wordCrosses = 0;

    for (let i = 0; i < word.length; i++) {
      if (grid[testPosition] !== "#" && grid[testPosition] !== word[i]) {
        return false;
      } else if (grid[testPosition] !== "#" && grid[testPosition] === word[i]) {
        wordCrosses += 1;
      }
      testPosition = WORDSEARCHCONSTANTS.dirNext[direction](testPosition, cols);
    }
    return wordCrosses;
  };

  const generateValidPlacements = (word, grid) => {
    let placements = [],
      { directions } = WORDSEARCHCONSTANTS;
    for (let j = 0; j < grid.length; j++) {
      for (let direction of directions) {
        let wordCrosses = checkNoCrashes(word, grid, direction, j);
        if (checkToFit(word, grid, direction, j) && wordCrosses !== false) {
          let emphasis = CROSSMULTIPLIER * wordCrosses + 1,
            placementsAddition = new Array(emphasis).fill({
              position: j,
              direction: direction
            });
          placements = placements.concat(placementsAddition);
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
      error = false,
      grid = wordUtils.makeHashGrid(rows, cols);
    for (let i = 0; i < words.length; i++) {
      let currentWord = words[i],
        placements = generateValidPlacements(currentWord, grid);
      if (placements.length === 0) {
        error = true;
        break;
      } else {
        let idx = wordUtils.randomArrayIndex(placements);
        grid = updateGrid(grid, placements[idx], currentWord);
        let wordPositions = getPositions(placements[idx], currentWord.length);
        wordPositionsObject[currentWord] = wordPositions;
      }
    }
    if (error) {
      return "error";
    }
    grid = wordUtils.fillUpGrid(grid, filler);
    return { grid: grid, wordPositions: wordPositionsObject, rows: rows };
  };

  let response = null;

  const runWordSearch = () => {
    for (let i = 0; i < 3; i++) {
      let result = createWordSearch();
      if (result !== "error") {
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
