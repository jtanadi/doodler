import React, { useState, ReactElement } from "react"
import Draggable from "react-draggable"

import { StyledPalette } from "./styles"
import { drawingTools, historyTools } from "../../utils/tools"

import ToolPaletteBar from "../ToolPaletteBar"
import ToolButtonsContainer from "../ToolButtonsContainer"

type PropTypes = {
  currentTool: string
  pickTool(type: string): void
  changeHistory(type: string): void
}

const ToolPalette: React.FC<PropTypes> = ({
  currentTool,
  pickTool,
  changeHistory,
}): ReactElement => {
  const [open, setOpen] = useState(true)
  const handleClick = (): void => {
    setOpen(prevState => !prevState)
  }

  return (
    <Draggable handle=".palette-bar" bounds="body">
      <StyledPalette
        open={open}
        numOfTools={drawingTools.length - 1 + historyTools.length - 1}
      >
        <ToolPaletteBar onClick={handleClick} />
        <ToolButtonsContainer
          tools={drawingTools}
          currentTool={currentTool}
          handleButton={pickTool}
        />
        <ToolButtonsContainer
          tools={historyTools}
          handleButton={changeHistory}
        />
      </StyledPalette>
    </Draggable>
  )
}

export default ToolPalette
