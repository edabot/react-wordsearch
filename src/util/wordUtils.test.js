import wordUtils from './wordUtils'

it('cleans up words', () => {
  expect(wordUtils.removeNonCharactersAndUppercase("<>sc ripT")).toEqual("SCRIPT")
});

it('removes array repeats', () => {
  expect(wordUtils.removeArrayRepeats(['bob', 'bo b', "BOB"])).toEqual(['bob'])
})

it('fills up a grid', () => {
  expect(wordUtils.fillUpGrid(['a', 'b', '#'], 'abc').includes('#')).toBeFalsy()
})
