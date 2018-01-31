import wordUtils from './wordUtils'

it('cleans up words', () => {
  expect(wordUtils.removeNonCharactersAndUppercase("<>sc ripT")).toEqual("SCRIPT")
});

it('cleans up an array', () => {
  expect(wordUtils.removeNonCharactersAndUppercaseForArray(['()(*at)', 'b   d.,;'])).toEqual(['AT', 'BD'])
})

it('removes array repeats', () => {
  expect(wordUtils.removeArrayRepeats(['bob', 'bo b', "BOB"])).toEqual(['bob'])
})

it('fills up a grid', () => {
  expect(wordUtils.fillUpGrid(['a', 'b', '#'], 'abc').includes('#')).toBeFalsy()
})

it('compares word lengths', () => {
  expect(wordUtils.compareWordLength('bigger', 'small')).toEqual(-1)
})

it('sorts biggest to smallest', () => {
  expect(wordUtils.sortBiggestToShortest(['a', 'bb', 'ccc'])).toEqual(['ccc', 'bb', 'a'])
})
