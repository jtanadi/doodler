import React, { useState, ReactElement } from "react"
import Draggable from "react-draggable"

import ToolPaletteBar from "../ToolPaletteBar"
import ToolButtonsContainer from "../ToolButtonsContainer"

import { StyledPalette } from "./styles"
import {
  ToolTypes,
  drawingTools,
  historyTools,
  layerTools,
} from "../../utils/tools"

type PropTypes = {
  currentTool: ToolTypes
  pickTool(type: ToolTypes): void
  changeHistory(type: ToolTypes): void
  changeLayerOrder(type: ToolTypes): void
}

const ToolPalette: React.FC<PropTypes> = ({
  currentTool,
  pickTool,
  changeHistory,
  changeLayerOrder,
}): ReactElement => {
  const [open, setOpen] = useState(true)
  const handleClick = (): void => {
    setOpen(prevState => !prevState)
  }

  return (
    <Draggable handle=".palette-bar" bounds="body">
      <StyledPalette
        open={open}
        numOfTools={
          drawingTools.length -
          1 +
          historyTools.length -
          1 +
          layerTools.length -
          1
        }
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
        <ToolButtonsContainer
          tools={layerTools}
          handleButton={changeLayerOrder}
        />
      </StyledPalette>
    </Draggable>
  )
}

export default ToolPalette
