import React, { Component } from "react";

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawing: [],
    };

    this.draw = this.draw.bind(this);
  }

  draw(ev) {
    const [x, y] = [ev.nativeEvent.offsetX, ev.nativeEvent.offsetY]

    if (x < 0 || y < 0) return;

    console.log(x, y, this.props.selectedTool)
  }

  render() {
    return (
      <div
        id="canvas"
        onClick={ this.draw }
      >
      </div>
    );
  }
}

export default Canvas;

