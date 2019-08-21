import React, { Component } from "react";
import ReactDOM from "react-dom";

import Toolbar from "./components/toolbar.jsx";
import Canvas from "./components/canvas.jsx";

import Drawing from "./dwg/drawing.js";
import { drawingTools, historyTools } from "./dwg/tools.js"

class App extends Component {
  constructor() {
    super();
    this.state = {
      drawing: {},
      currentTool: "rect",
      canvasWidth: 800,
      canvasHeight: 600,
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

  componentDidMount() {
    const canvas = document.getElementById("canvas")
    const drawing = new Drawing(canvas)

    const undoButton = document.getElementById("undo")
    const redoButton = document.getElementById("redo")

    this.setState({ drawing, undoButton, redoButton });

    document.addEventListener("keypress", this.routeKeyPress)
    document.addEventListener("keyup", this.routeKeyUp)
  }

  componentWillUnmount() {
    document.removeEventListener("keypress", this.routeKeyPress)
    document.removeEventListener("keyup", this.routeKeyUp)
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
        <Toolbar
          drawingTools={ drawingTools }
          historyTools= { historyTools }
          currentTool={ currentTool }
          pickTool={ this.pickTool }
          changeHistory={ this.changeHistory }
          addSelected={ this.addSelectedClass }
          removeSelected={ this.removeSelectedClass }
        />
        <Canvas
          drawing={ drawing }
          currentTool={ currentTool }
          width={ canvasWidth }
          height={ canvasHeight }
        />
      </div>
    );
  }
}

const root = document.getElementById("root");
ReactDOM.render(<App />, root);

