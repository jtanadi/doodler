import React, { useState } from "react"
import Draggable from "react-draggable"

import {
  StyledPalette,
  StyledButtonContainer
} from "./styles"

import ToolButton from "../ToolButton"
import ToolPaletteBar from "../ToolPaletteBar"
import BarItems from "../BarItems"

export default function ToolPalette(props) {
  const {
    drawingTools,
    historyTools,
    currentTool,
    pickTool,
    changeHistory,
    addSelected,
    removeSelected,
  } = props;

  const [open, setOpen] = useState(true)
  const handleClick = () => {
    setOpen(prevState => !prevState)
  }

  return (
    <Draggable handle=".palette-bar" bounds="body">
      <StyledPalette open={open}>
        <ToolPaletteBar onClick={handleClick} />

        <StyledButtonContainer>
          <BarItems
            items={drawingTools}
            selectedItem={currentTool}
            itemClass="tool"
            onClick={ev => pickTool(ev.target.id)}
          />
        </StyledButtonContainer>
        <StyledButtonContainer>
          <BarItems
            items={historyTools}
            itemClass="tool"
            onMouseDown={ev => props.addSelected(ev.target)}
            onMouseUp={ev => props.removeSelected(ev.target)}
            onMouseMove={ev => props.removeSelected(ev.target)}
            onClick={ev => changeHistory(ev.target.id)}
          />
        </StyledButtonContainer>
      </StyledPalette>
    </Draggable>
  )
}
