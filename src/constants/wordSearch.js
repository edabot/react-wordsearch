export default {
  directions: [
    "leftup",
    "up",
    "rightup",
    "left",
    "right",
    "leftdown",
    "down",
    "rightdown"
  ],

  dirNext: {
    right: (pos, cols) => pos + 1,
    left: (pos, cols) => pos - 1,
    up: (pos, cols) => pos - cols,
    down: (pos, cols) => pos + cols,
    rightup: (pos, cols) => pos + 1 - cols,
    rightdown: (pos, cols) => pos + 1 + cols,
    leftup: (pos, cols) => pos - 1 - cols,
    leftdown: (pos, cols) => pos - 1 + cols
  },

  dirEnd: {
    right: (pos, length) => {
      return { row: pos.row, col: pos.col + length };
    },
    left: (pos, length) => {
      return { row: pos.row, col: pos.col - length };
    },
    up: (pos, length) => {
      return { row: pos.row - length, col: pos.col };
    },
    down: (pos, length) => {
      return { row: pos.row + length, col: pos.col };
    },
    rightup: (pos, length) => {
      return { row: pos.row - length, col: pos.col + length };
    },
    rightdown: (pos, length) => {
      return { row: pos.row + length, col: pos.col + length };
    },
    leftup: (pos, length) => {
      return { row: pos.row - length, col: pos.col - length };
    },
    leftdown: (pos, length) => {
      return { row: pos.row + length, col: pos.col - length };
    }
  }
};
