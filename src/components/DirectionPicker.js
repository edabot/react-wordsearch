import React, { Component } from "react";
import CONSTANTS from "../constants/wordSearch";

const Direction = ({ directions, direction, onClick }) => {
  let dirClass;
  if (directions[direction]) {
    dirClass = "direction_on";
  } else {
    dirClass = "direction_off";
  }
  return (
    <div className={dirClass} onClick={() => onClick(direction)}>
      {direction}
    </div>
  );
};

class DirectionPicker extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="direction-list">
        {CONSTANTS.directions.map(direction => (
          <Direction
            directions={this.props.directions}
            direction={direction}
            onClick={this.props.onClick}
            key={direction}
          />
        ))}
      </div>
    );
  }
}

export default DirectionPicker;
