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
    };
    this.child = React.createRef();

    this.pickTool = this.pickTool.bind(this);
    this.routeKeyPress = this.routeKeyPress.bind(this);
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
      this.changeHistory("undo");
    } else if (ev.key === "r") {
      this.changeHistory("redo");
    }
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
    document.addEventListener("keypress", this.routeKeyPress)

    const canvas = document.getElementById("canvas")
    const drawing = new Drawing(canvas)
    this.setState({ drawing });
  }

  componentWillUnmount() {
    document.removeEventListener("keypress", this.routeKeyPress)
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

