import React, { useState, ReactElement } from "react"
import Draggable from "react-draggable"

import ToolPaletteBar from "../ToolPaletteBar"
import ToolButtonsContainer from "../ToolButtonsContainer"
import ColorPickerContainer from "../ColorPickerContainer"

import { StyledPalette } from "./styles"
import {
  ToolTypes,
  drawingTools,
  historyTools,
  layerTools,
} from "../../utils/tools"

type PropTypes = {
  currentTool: ToolTypes
  fillColor: string
  strokeColor: string
  pickTool(type: ToolTypes): void
  changeHistory(type: ToolTypes): void
  changeLayerOrder(type: ToolTypes): void
  handleFillColor(type: string): void
  handleStrokeColor(type: string): void
}

const ToolPalette: React.FC<PropTypes> = ({
  currentTool,
  fillColor,
  strokeColor,
  pickTool,
  changeHistory,
  changeLayerOrder,
  handleFillColor,
  handleStrokeColor,
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
        <ColorPickerContainer
          fillColor={fillColor}
          strokeColor={strokeColor}
          handleFillColor={handleFillColor}
          handleStrokeColor={handleStrokeColor}
        />
      </StyledPalette>
    </Draggable>
  )
}

export default ToolPalette
