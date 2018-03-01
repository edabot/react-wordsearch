import React, { Component } from "react";

const displayDirections = [
  "leftup",
  "up",
  "rightup",
  "left",
  "center",
  "right",
  "leftdown",
  "down",
  "rightdown"
];

const directionArrows = {
  leftup: "↖",
  up: "↑",
  rightup: "↗",
  left: "←",
  center: "x",
  right: "→",
  leftdown: "↙",
  down: "↓",
  rightdown: "↘"
};

const Direction = ({ directions, direction, onClick }) => {
  let dirClass;
  if (directions[direction]) {
    dirClass = "arrow direction-on";
  } else {
    dirClass = "arrow direction-off";
  }
  if (direction === "center") {
    return <div className="arrow"> </div>;
  }
  return (
    <div className={dirClass} onClick={() => onClick(direction)}>
      {directionArrows[direction]}
    </div>
  );
};

class DirectionPicker extends Component {
  render() {
    return (
      <div className="direction-list">
        <h3>Word directions</h3>
        <div className="direction-arrows">
          {displayDirections.map(direction => (
            <Direction
              directions={this.props.directions}
              direction={direction}
              onClick={this.props.onClick}
              key={direction}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default DirectionPicker;
