This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

This is a word search generator. Users can enter a list of words or phrases and this will automatically create a word search grid.

The size of the grid is determined by the word list. It starts out as the length of the longest word plus 2 characters. If that is too small and no solutions are found, the size increments and retries until it succeeds.

The algorithm goes as follows for each word:
 - Find all possible positions for the word in the grid
 - Filter out all positions that have collisions with existing words in the grid
 - Randomly select one position and save it to the grid

Once the words have been placed, the rest of the letters are filled in using the same letters as the words with the same distributions.

In short, all of the words are connected into one string and a character is randomly selected from that string.

In the display of the grid and the word list, words in the grid can be highlighted by hovering over the words in the word list.

Once a grid has been generated, users can save it to DynamoDB and are given a URL to load it again. This was done to save the solutions in case the results are printed out.

To do:
 - Display solution of all of the words in the grid with rounded rectangles around each word
 - Add top nav
 - Add page with lists of pre-made grids
 - Handle error response for loading a grid from DynamoDB
 - Improve layout
