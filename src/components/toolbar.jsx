import React, { Component } from "react";

function Toolbar(props) {
  const { tools, selectedTool, handleClick } = props;
  return (
    <div id="toolbar-container">{
      tools.map(tool => {
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
          </div>
        )
      })
    }</div>
  )
}

export default Toolbar;
