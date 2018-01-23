
import list from './list'

const compareWordLength = (a, b) => {
  return b.length - a.length;
}

const removeNonCharactersAndUppercase = (stringArray) => {
  return stringArray.map(string => string.replace(/[\W_]/g, '').toUpperCase())
}


const fillUpGrid = (hashGrid, filler) => {
  let len = filler.length,
    newGrid = hashGrid.slice()
  for (let i = 0; i < hashGrid.length; i++) {
    if ( hashGrid[i] === '#' ) {
      let newLetter = filler[Math.floor(Math.random() * len)]
      newGrid[i] = newLetter
    }
  }
  return newGrid
}

const WordSearch = (wordList = list, rowInput = 50, colInput = 50) => {

  let cleanedWordList = removeNonCharactersAndUppercase(wordList)
  let words = cleanedWordList.sort(compareWordLength)

  let rows = words[0].length + 2
  let cols = rows
  const dirs = ['right', 'left', 'up', 'down', 'rightup', 'rightdown', 'leftup', 'leftdown']
  let filler = ""
  let grid = new Array(rows * cols).fill('#')

  //filler is a string with all words in it. This
  for (let i=0; i < words.length; i++) {
    filler += words[i]
  }

  const dirNext = {
    'right': pos => pos + 1,
    'left': pos => pos - 1,
    'up': pos => pos - cols,
    'down': pos => pos + cols,
    'rightup': pos => pos + 1 - cols,
    'rightdown': pos => pos + 1 + cols,
    'leftup': pos => pos - 1 - cols,
    'leftdown': pos => pos -1 + cols
  }

  const dirEnd = {
    'right': (pos, length) => { return {row: pos.row, col: pos.col + length}},
    'left': (pos, length) => { return {row: pos.row, col: pos.col - length}},
    'up': (pos, length) => { return {row: pos.row - length, col: pos.col}},
    'down': (pos, length) => { return {row: pos.row + length, col: pos.col}},
    'rightup': (pos, length) => { return {row: pos.row - length, col: pos.col + length}},
    'rightdown': (pos, length) => { return {row: pos.row + length, col: pos.col + length}},
    'leftup': (pos, length) => { return {row: pos.row - length, col: pos.col - length}},
    'leftdown': (pos, length) => { return {row: pos.row + length, col: pos.col - length}}
  }

  const rowColFromPos = (position) => {
    let row = Math.floor(position / cols),
      col = position % cols
      return {row: row, col: col}
  }

  const updateGrid = (oldGrid, placement, word) => {
    let newGrid = oldGrid.slice(),
      {position, direction} = placement

    for (let i = 0; i < word.length; i++) {
      newGrid[position] = word[i]
      position = dirNext[direction](position)
    }

    return newGrid
  }

  const checkToFit = (word, grid, direction, position) => {
    let endPosition = dirEnd[direction](rowColFromPos(position), word.length - 1)
    if (endPosition.row < 0 || endPosition.row >= rows || endPosition.col < 0 || endPosition.col >= cols) { return false }
    return true
  }

  const checkNoCrashes = (word, grid, direction, position) => {
    let testPosition = position
    for (let i = 0; i < word.length; i++) {
      if (grid[testPosition] !== "#" && grid[testPosition] !== word[i]) {
        return false
      }
      testPosition = dirNext[direction](testPosition)
    }
    return true
  }

  const scanPlacements = (word, grid) => {
    let placements = []
    for (let j = 0; j < grid.length; j++) {
      for (let k = 0; k < dirs.length; k++) {
        let direction = dirs[k]
        if (checkToFit(word, grid, direction, j) &&
        checkNoCrashes(word, grid, direction, j)) {
          placements.push({position: j, direction: direction})
        }
      }
    }
    return placements
  }

  const getPositions = (placement, length) => {
    let positionArray = [],
      { position, direction } = placement
    for (let i = 0; i < length; i++) {
      positionArray.push(position)
      position = dirNext[direction](position)
    }
    return positionArray
  }

  const createWordSearch = () => {
    let wordPositionsObject = {};
    grid = new Array(rows * cols).fill('#')
    for (let i = 0; i < words.length; i++ ) {
      let currentWord = words[i]
      let placements = scanPlacements(currentWord, grid)
      if (placements.length === 0) {
        console.log('error')
        return 'error'
      } else {
        let idx = Math.floor(Math.random() * placements.length)
        grid = updateGrid(grid, placements[idx], currentWord)
        let wordPositions = getPositions(placements[idx], currentWord.length)
        wordPositionsObject[currentWord] = wordPositions
      }
    }
    grid = fillUpGrid(grid, filler)
    return {grid: grid, wordPositions: wordPositionsObject, rows: rows}
  }

  const runWordSearch = () => {
    for (let i = 0; i < 3; i++) {
      let result = createWordSearch()
      if (result !== 'error') {
        return result
      }
      if ( i === 2 ) {
        rows += 1
        cols += 1
        runWordSearch()
      }
    }
  }

  return runWordSearch()
}

export default WordSearch
