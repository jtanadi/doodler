import React from "react";
import Bar from "./bar.jsx";
import BarItems from "./barItems.jsx";

export default function Toolbar(props) {
  const {
    drawingTools,
    historyTools,
    currentTool,
    pickTool,
    changeHistory,
    addSelected,
    removeSelected,
  } = props;

  return (
    <div id="toolbar-container">
      <Bar side="left">
        <BarItems
          items={ drawingTools }
          selectedItem={ currentTool }
          itemClass="tool"
          onClick={ ev => pickTool(ev.target.id) }
        />
      </Bar>
      <Bar side="right">
        <BarItems
          items={ historyTools }
          itemClass="tool"
          onMouseDown={ ev => props.addSelected(ev.target) }
          onMouseUp={ ev => props.removeSelected(ev.target) }
          onMouseMove={ ev => props.removeSelected(ev.target) }
          onClick={ ev => changeHistory(ev.target.id) }
        />
      </Bar>
    </div>
  );
}
