import wordUtils from './wordUtils';

it('cleans up words', () => {
  expect(wordUtils.removeNonCharactersAndUppercase('sc  ripT')).toEqual(
    'SCRIPT'
  );
});

it('cleans up an array', () => {
  expect(
    wordUtils.removeNonCharactersAndUppercaseForArray(['a t', 'b   d'])
  ).toEqual(['AT', 'BD']);
});

it('removes array repeats', () => {
  expect(wordUtils.removeArrayRepeats(['bob', 'bo b', 'BOB'])).toEqual(['bob']);
});

it('fills up a grid', () => {
  expect(
    wordUtils.fillUpGrid(['a', 'b', '#'], 'abc').includes('#')
  ).toBeFalsy();
});

it('compares word lengths', () => {
  expect(wordUtils.compareWordLength('bigger', 'small')).toEqual(-1);
});

it('sorts biggest to smallest', () => {
  expect(wordUtils.sortBiggestToShortest(['a', 'bb', 'ccc'])).toEqual([
    'ccc',
    'bb',
    'a'
  ]);
});

it('make a hash grid', () => {
  expect(wordUtils.makeHashGrid(2, 2)).toEqual(['#', '#', '#', '#']);
});

it('row/col object from position and columns', () => {
  let result = wordUtils.rowColFromPos(21, 5);
  expect(result.row).toEqual(4);
  expect(result.col).toEqual(1);
});
