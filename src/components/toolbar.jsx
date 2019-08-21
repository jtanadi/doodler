import React from "react";
import Bar from "./bar.jsx";
import BarItems from "./barItems.jsx";

function addSelectedClass(target) {
  target.classList.add("selected");
}

function removeSelectedClass(target) {
  target.classList.add("selected");
}

export default function Toolbar(props) {
  const {
    drawTools,
    historyTools,
    selectedTool,
    pickTool,
    changeHistory
  } = props;

  return (
    <div id="toolbar-container">
      <Bar side="left">
        <BarItems
          items={ drawTools }
          selectedItem={ selectedTool }
          itemClass="tool"
          onClick={ ev => pickTool(ev.target.id) }
        />
      </Bar>
      <Bar side="right">
        <BarItems
          items={ historyTools }
          itemClass="tool"
          onMouseDown={ ev => addSelectedClass(ev.target) }
          onMouseUp={ ev => removeSelectedClass(ev.target) }
          onMouseMove={ ev => removeSelectedClass(ev.target) }
          onClick={ ev => changeHistory(ev.target.id) }
        />
      </Bar>
    </div>
  );
}
