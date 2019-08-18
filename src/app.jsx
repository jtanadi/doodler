import React, { Component } from "react";
import ReactDOM from "react-dom";

import Toolbar from "./components/toolbar.jsx";
import Canvas from "./components/canvas.jsx";

import Drawing from "./dwg/drawing.js";

const TOOLS = ["rect", "ellipse", "line"];

class App extends Component {
  constructor() {
    super();
    this.state = {
      tool: "rect",
    };
    this.child = React.createRef();

    this.pickTool = this.pickTool.bind(this);
    this.routeKeyPress = this.routeKeyPress.bind(this);
    this.changeHistory = this.changeHistory.bind(this);
  }

  routeKeyPress(ev) {
    const numKey = parseInt(ev.key);
    if (numKey > 0 && numKey <= TOOLS.length) {
      this.pickTool(TOOLS[numKey - 1]);
    } else if (ev.key === "u") {
      this.changeHistory("undo")
    } else if (ev.key === "r") {
      this.changeHistory("redo")
    }
  }

  pickTool(tool) {
    this.setState({ tool });
  }

  changeHistory(action) {
    if (action === "undo") {
      this.child.current.handleUndo();
    } else if (action === "redo") {
      this.child.current.handleRedo();
    }
  }

  componentDidMount() {
    document.addEventListener("keypress", this.routeKeyPress)
  }

  componentWillUnmount() {
    document.removeEventListener("keypress", this.routeKeyPress)
  }

  render() {
    const { tool } = this.state;
    return (
      <div id="wrapper">
        <Toolbar
          tools={ TOOLS }
          selectedTool={ tool }
          pickTool={ this.pickTool }
          changeHistory={ this.changeHistory }
        />
        <Canvas
          selectedTool={ tool }
          ref={ this.child }
        />
      </div>
    );
  }
}

const root = document.getElementById("root");
ReactDOM.render(<App />, root);

