import WordSearch from './wordsearch'

it('makes a correct grid length', () => {
  expect(WordSearch(['cat', 'dog', 'bird']).grid).toHaveLength(36)
})

it('makes correct row size', () => {
  expect(WordSearch(['cat', 'dog', 'bird']).rows).toEqual(6)
})

it('makes a wordPosition for each word', () => {
  let result = WordSearch(['cat', 'dog', 'bird'])
  expect(Object.keys(result.wordPositions)).toHaveLength(3)
})

it('expands the grid when words won\'t fit', () => {
  let result = WordSearch(['cat', 'dog', 'hat', 'max', 'tim', 'yap', 'xex', 'zaz', 'wiw', 'pyp', 'usu'])
  expect(result.rows).toBeGreaterThan(5)
})
