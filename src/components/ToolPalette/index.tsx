import React, { useState, ReactElement } from "react"
import Draggable from "react-draggable"

import { StyledPalette } from "./styles"
import { drawingTools } from "../../utils/tools"

import ToolButton from "../ToolButton"
import ToolPaletteBar from "../ToolPaletteBar"
import ToolButtonsContainer from "../ToolButtonsContainer"

type PropTypes = {
  currentTool: string
  pickTool(id: string): void
  changeHistory(): void
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
      <StyledPalette open={open} numOfTools={drawingTools.length - 1}>
        <ToolPaletteBar onClick={handleClick} />

        <ToolButtonsContainer>
          {drawingTools.map((tool, i) =>
            // 0th tool is null
            i > 0 ? (
              <ToolButton key={i} icon={tool.icon} pickTool={pickTool} />
            ) : null
          )}
        </ToolButtonsContainer>
      </StyledPalette>
    </Draggable>
  )
}

export default ToolPalette
