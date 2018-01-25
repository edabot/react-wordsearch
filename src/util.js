import axios from 'axios'
import shortid from 'shortid'

const utils = {
  postGrid: (grid, rows, wordPositions, wordList, callback) => {
    axios.post("https://qr7yduveu8.execute-api.us-east-1.amazonaws.com/prod", {
      "gridId": shortid.generate(),
      "grid": grid.join(" "),
      "rows": rows,
      "wordPositions": wordPositions,
      "wordList": wordList
    })
    .then(function (response) {
      callback(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  },

  getGrid: (gridId, callback) => {
    axios.get('https://qr7yduveu8.execute-api.us-east-1.amazonaws.com/prod/?gridId=' + gridId)
      .then(function (response) {
        let data = response.data
        data.grid = data.grid.split(' ')
        callback(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

export default utils
