import React, { Component } from "react";

import Drawing from "../dwg/drawing.js";

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

    if (this.props.currentTool === "brush") {
      this.props.drawing.createBrush(x, y, x, y, "green")
    }

    this.setState({ mouseDown: true, startX: x, startY: y })
  }

  handleMouseMove(ev) {
    const { startX, startY, mouseDown } = this.state;

    if (!mouseDown) return;
    const [x, y] = [ev.nativeEvent.offsetX, ev.nativeEvent.offsetY]

    if (this.props.currentTool === "brush") {
      this.props.drawing.createBrush(startX, startY, x, y, "green")
      this.setState({ startX: x, startY: y })
    } else {
      this.props.drawing.drawMarquee(startX, startY, x, y, this.props.currentTool, "green");
    }
  }

  handleMouseUp(ev) {
    const { startX, startY } = this.state;
    const [x, y] = [ev.nativeEvent.offsetX, ev.nativeEvent.offsetY]

    this.props.drawing.createShape(startX, startY, x, y, this.props.currentTool, "green");
    this.setState({ mouseDown: false });
  }

  render() {
    const { width, height } = this.props;
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

