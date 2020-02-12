import React, { useState, ReactElement } from "react"
import Draggable from "react-draggable"
import { SketchPicker } from "react-color"

import ToolPaletteBar from "../ToolPaletteBar"
import ToolButtonsContainer from "../ToolButtonsContainer"
import ColorPickerContainer from "../ColorPickerContainer"

import { StyledPalette, Popover, PaletteWrapper } from "./styles"
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
  displayFillPicker: boolean
  displayStrokePicker: boolean
  pickTool(type: ToolTypes): void
  changeHistory(type: ToolTypes): void
  changeLayerOrder(type: ToolTypes): void
  onFillColorChange(color): void
  onStrokeColorChange(color): void
  onFillColorClick(): void
  onStrokeColorClick(): void
}

const ToolPalette: React.FC<PropTypes> = ({
  currentTool,
  fillColor,
  strokeColor,
  displayFillPicker,
  displayStrokePicker,
  pickTool,
  changeHistory,
  changeLayerOrder,
  onFillColorChange,
  onStrokeColorChange,
  onFillColorClick,
  onStrokeColorClick,
}): ReactElement => {
  const [open, setOpen] = useState(true)
  const handleMinimize = (): void => {
    setOpen(prevState => !prevState)
  }

  return (
    <Draggable handle=".palette-bar" bounds="body">
      <PaletteWrapper>
        <StyledPalette open={open} contentHeight={6 * 2.5 + 3 * 0.25 + 2.5}>
          <ToolPaletteBar onClick={handleMinimize} />
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
            handleFillClick={onFillColorClick}
            handleStrokeClick={onStrokeColorClick}
          />
        </StyledPalette>

        {displayFillPicker ? (
          <Popover>
            <SketchPicker color={fillColor} onChange={onFillColorChange} />
          </Popover>
        ) : null}
        {displayStrokePicker ? (
          <Popover stroke={true.toString()}>
            <SketchPicker
              color={strokeColor}
              onChange={onStrokeColorChange}
              onChangeComplete={onStrokeColorChange}
            />
          </Popover>
        ) : null}
      </PaletteWrapper>
    </Draggable>
  )
}

export default ToolPalette
