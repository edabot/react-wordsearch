
const wordUtils = {
  removeNonCharactersAndUppercase: (string) => {
    return string.replace(/[\W_]/g, '').toUpperCase()
  },

  removeNonCharactersAndUppercaseForArray: (stringArray) => {
    return stringArray.map(string => wordUtils.removeNonCharactersAndUppercase(string))
  },

  removeArrayRepeats: (array) => {
    let existingWords = {},
    result = []
    for (let i = 0; i < array.length; i++) {
      let cleanedWord = wordUtils.removeNonCharactersAndUppercase(array[i])
      if (!existingWords[cleanedWord] && cleanedWord.length > 0) {
        result.push(array[i])
        existingWords[cleanedWord] = true
      }
    }
    return result
  },

  fillUpGrid: (hashGrid, filler) => {
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

}

export default wordUtils
