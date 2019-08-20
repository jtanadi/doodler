import React, { Component } from "react";

import Drawing from "../dwg/drawing.js";

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 400,
      height: 500,
      mouseDown: false,
      startX: 0,
      startY: 0,
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  handleMouseDown(ev) {
    const [x, y] = [ev.nativeEvent.offsetX, ev.nativeEvent.offsetY]
    if (x < 0 || y < 0) return;

    this.setState({ mouseDown: true, startX: x, startY: y })
  }

  handleMouseMove(ev) {
    const { startX, startY, mouseDown } = this.state;

    if (!mouseDown) return;
    const [x, y] = [ev.nativeEvent.offsetX, ev.nativeEvent.offsetY]

    this.props.drawing.drawMarquee(startX, startY, x, y, this.props.selectedTool, "green");
  }

  handleMouseUp(ev) {
    const { startX, startY } = this.state;
    const [x, y] = [ev.nativeEvent.offsetX, ev.nativeEvent.offsetY]

    this.props.drawing.createShape(startX, startY, x, y, this.props.selectedTool, "green");
    this.setState({ mouseDown: false });
  }

  render() {
    const { width, height } = this.state;
    return (
      <canvas
        id="canvas"
        onMouseDown={ this.handleMouseDown }
        onMouseMove={ this.handleMouseMove }
        onMouseUp={ this.handleMouseUp }
        width={ `${width}px` }
        height={ `${height}px` }
      >
      </canvas>
    );
  }
}

export default Canvas;

