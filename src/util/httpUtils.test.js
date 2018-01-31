import shortid from 'shortid'
import utils from './httpUtils'

it('shortid returns a string of 9 chars', () => {
  expect(shortid.generate().length).toEqual(9)
})
