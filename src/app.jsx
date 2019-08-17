import React, { Component } from "react";
import ReactDOM from "react-dom";

import Toolbar from "./components/toolbar";
import Canvas from "./components/canvas";

const TOOLS = ["rect", "circ", "line"];

class App extends Component {
  constructor() {
    super();
    this.state = {
      tool: "rect",
    };

    this.selectTool = this.selectTool.bind(this);
    this.routeKeyPress = this.routeKeyPress.bind(this);
  }

  routeKeyPress(ev) {
    const numKey = parseInt(ev.key);
    if (numKey > 0 && numKey <= TOOLS.length) {
      this.selectTool(TOOLS[numKey - 1]);
    } else if (ev.key === "u") {
      // implement undo
      console.log("undo")
    } else if (ev.key === "r") {
      // impelement redo
      console.log("redo")
    }
  }

  selectTool(tool) {
    this.setState({ tool });
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
          handleClick={ this.selectTool }
        />
        <Canvas selectedTool={ tool }/>
      </div>
    );
  }
}

const root = document.getElementById("root");
ReactDOM.render(<App />, root);

