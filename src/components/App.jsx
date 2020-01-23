import React, { Component } from "react";

import Canvas from "./Canvas";
import ToolPalette from "./ToolPalette"

import Drawing from "../dwg/drawing.js";
import { drawingTools, historyTools } from "../dwg/tools.js"


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      drawing: {},
      currentTool: "rect",
      canvasWidth: 0,
      canvasHeight: 0,
      drawingTools,
      historyTools,
      undoButton: {},
      redoButton: {},
    };
    this.child = React.createRef();

    this.pickTool = this.pickTool.bind(this);
    this.routeKeyPress = this.routeKeyPress.bind(this);
    this.routeKeyUp = this.routeKeyUp.bind(this);
    this.changeHistory = this.changeHistory.bind(this);
    this.updateCanvasSize = this.updateCanvasSize.bind(this)
  }

  routeKeyPress(ev) {
    const { drawingTools } = this.state
    const numKey = parseInt(ev.key);
    if (numKey > 0 && numKey <= Object.keys(drawingTools).length) {
      const idx = numKey - 1;
      const selectedTool = Object.keys(drawingTools)[idx];
      this.pickTool(selectedTool);
    } else if (ev.key === "u") {
      this.addSelectedClass(this.state.undoButton);
      this.changeHistory("undo");
    } else if (ev.key === "r") {
      this.addSelectedClass(this.state.redoButton);
      this.changeHistory("redo");
    }
  }

  routeKeyUp(ev) {
    if (ev.key === "u") {
      this.removeSelectedClass(this.state.undoButton);
    } else if (ev.key === "r") {
      this.removeSelectedClass(this.state.redoButton);
    }
  }

  addSelectedClass(target) {
    target.classList.add("selected");
  }

  removeSelectedClass(target) {
    target.classList.remove("selected");
  }

  pickTool(tool) {
    this.setState({ currentTool: tool });
  }

  changeHistory(action) {
    const { drawing } = this.state;
    if (action === "undo") {
      drawing.undo()
    } else if (action === "redo") {
      drawing.redo()
    }
  }

  updateCanvasSize() {
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    this.setState({ canvasWidth, canvasHeight });
  }

  componentDidMount() {
    const canvas = document.getElementById("canvas")
    const drawing = new Drawing(canvas)

    const undoButton = document.getElementById("undo")
    const redoButton = document.getElementById("redo")

    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    this.setState({ drawing, undoButton, redoButton, canvasWidth, canvasHeight });

    document.addEventListener("keypress", this.routeKeyPress)
    document.addEventListener("keyup", this.routeKeyUp)
    window.addEventListener("resize", this.updateCanvasSize)
  }

  componentWillUnmount() {
    document.removeEventListener("keypress", this.routeKeyPress)
    document.removeEventListener("keyup", this.routeKeyUp)
    window.removeEventListener("resize", this.updateCanvasSize)
  }

  render() {
    const {
      currentTool,
      drawing,
      canvasWidth,
      canvasHeight,
      drawingTools,
      historyTools,
    } = this.state;

    return (
      <div id="wrapper">
        {/* <ToolPalette /> */}
        <ToolPalette
          drawingTools={drawingTools}
          historyTools={historyTools}
          currentTool={currentTool}
          pickTool={this.pickTool}
          changeHistory={this.changeHistory}
          addSelected={this.addSelectedClass}
          removeSelected={this.removeSelectedClass}
        />
        <Canvas
          drawing={drawing}
          currentTool={currentTool}
          width={canvasWidth}
          height={canvasHeight}
        />
      </div>
    );
  }
}

