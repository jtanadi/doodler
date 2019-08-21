import React, { Component } from "react";
import ReactDOM from "react-dom";

import Toolbar from "./components/toolbar.jsx";
import Canvas from "./components/canvas.jsx";

import Drawing from "./dwg/drawing.js";

const TOOLS = {
  "rect": "◻",
  "ellipse": "◯",
  "line": "|",
}

const HISTORY_TOOLS = {
  "undo": "↶",
  "redo": "↷",
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      drawing: {},
      tool: "rect",
    };
    this.child = React.createRef();

    this.pickTool = this.pickTool.bind(this);
    this.routeKeyPress = this.routeKeyPress.bind(this);
    this.changeHistory = this.changeHistory.bind(this);
  }

  routeKeyPress(ev) {
    const numKey = parseInt(ev.key);
    if (numKey > 0 && numKey <= Object.keys(TOOLS).length) {
      const idx = numKey - 1;
      const tool = Object.keys(TOOLS)[idx];
      this.pickTool(tool);
    } else if (ev.key === "u") {
      this.changeHistory("undo");
    } else if (ev.key === "r") {
      this.changeHistory("redo");
    }
  }

  pickTool(tool) {
    this.setState({ tool });
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
    const { tool, drawing } = this.state;
    return (
      <div id="wrapper">
        <Toolbar
          drawTools={ TOOLS }
          historyTools= { HISTORY_TOOLS }
          selectedTool={ tool }
          pickTool={ this.pickTool }
          changeHistory={ this.changeHistory }
        />
        <Canvas
          drawing={ drawing }
          selectedTool={ tool }
          ref={ this.child }
        />
      </div>
    );
  }
}

const root = document.getElementById("root");
ReactDOM.render(<App />, root);

