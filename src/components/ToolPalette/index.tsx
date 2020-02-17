import React, { ReactElement } from "react"
import Draggable from "react-draggable"
import { SketchPicker } from "react-color"

import Window from "../Window"
import ToolButtonsContainer from "../ToolButtonsContainer"
import ColorPickerContainer from "../ColorPickerContainer"

import { Popover, PaletteWrapper } from "./styles"
import {
  DrawingToolTypes,
  HistoryActions,
  LayerActions,
  drawingTools,
  historyTools,
  layerTools,
} from "../../utils/tools"

type PropTypes = {
  currentTool: DrawingToolTypes
  fillColor: string
  strokeColor: string
  displayFillPicker: boolean
  displayStrokePicker: boolean
  pickTool(type: DrawingToolTypes): void
  changeHistory(action: HistoryActions): void
  changeLayerOrder(action: LayerActions): void
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
  return (
    <Draggable handle=".palette-bar" bounds="body">
      <PaletteWrapper>
        <Window contentWidth={5} contentHeight={6 * 2.5 + 3 * 0.25}>
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
        </Window>

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
