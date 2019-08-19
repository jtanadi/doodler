import React, { Component } from "react";

function LeftBar(props) {
  const { tools, selectedTool, side, handleClick } = props;
  return (
    <div className="bar" id="bar-left">{
      tools.map((tool, i) => {
        const className = tool === selectedTool
          ? "tool selected"
          : "tool"

        return (
          <div
            key={ tool }
            className={ className }
            id={ tool }
            onClick={ ev => handleClick(ev.target.id) }
          >
            <span className="small">{ i + 1 }</span>
          </div>
        )
      })
    }</div>
  )
}

class RightBar extends Component {
  constructor() {
    super()
    this.addSelected = this.addSelected.bind(this)
    this.removeSelected = this.removeSelected.bind(this)
  }

  addSelected(ev) {
    ev.target.classList.add("selected");
  }
  removeSelected(ev) {
    ev.target.classList.remove("selected");
  }

  render() {
    const tools = {
      "undo": "↶",
      "redo": "↷",
    };
    return (
      <div className="bar" id="bar-right"> {
        Object.keys(tools).map(key => (
          <div
            key={ key }
            className="tool"
            id={ key }
            onMouseDown={ this.addSelected }
            onMouseUp={ this.removeSelected }
            onMouseLeave={ this.removeSelected }
            onClick={ ev => this.props.handleClick(ev.target.id) }
          >
            <span>{ tools[key] }</span>
          </div>
        ))
      }</div>
    )
  }
}

function Toolbar(props) {
  const { tools, selectedTool, pickTool, changeHistory } = props;

  return (
    <div id="toolbar-container">
      <LeftBar
        tools={ tools }
        selectedTool={ selectedTool }
        handleClick={ pickTool }
      />
      <RightBar
        handleClick={ changeHistory }
      />
    </div>
  )
}

export default Toolbar;
