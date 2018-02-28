const wordUtils = {
  removeNonCharactersAndUppercase: string => {
    return string.replace(/[!@#$&()\-`.+,<>'/\\"\s]+/g, "").toUpperCase();
  },

  removeNonCharactersAndUppercaseForArray: stringArray => {
    return stringArray.map(string =>
      wordUtils.removeNonCharactersAndUppercase(string)
    );
  },

  removeArrayRepeats: array => {
    let existingWords = {},
      result = [];
    for (let i = 0; i < array.length; i++) {
      let cleanedWord = wordUtils.removeNonCharactersAndUppercase(array[i]);
      if (!existingWords[cleanedWord] && cleanedWord.length > 0) {
        result.push(array[i]);
        existingWords[cleanedWord] = true;
      }
    }
    return result;
  },

  fillUpGrid: (hashGrid, filler) => {
    let len = filler.length,
      newGrid = hashGrid.slice();
    for (let i = 0; i < hashGrid.length; i++) {
      if (hashGrid[i] === "#") {
        let newLetter = filler[Math.floor(Math.random() * len)];
        newGrid[i] = newLetter;
      }
    }
    return newGrid;
  },

  compareWordLength: (a, b) => {
    return b.length - a.length;
  },

  sortBiggestToShortest: words => {
    return words.sort(wordUtils.compareWordLength);
  },

  makeHashGrid: (rows, cols) => {
    return new Array(rows * cols).fill("#");
  },

  rowColFromPos: (position, columns) => {
    let row = Math.floor(position / columns),
      col = position % columns;
    return { row: row, col: col };
  },

  randomArrayIndex: array => {
    return Math.floor(Math.random() * array.length);
  }
};

export default wordUtils;
