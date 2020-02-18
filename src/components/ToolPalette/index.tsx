import React, { ReactElement, useEffect, useState } from "react"
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
  handleHistory(action?: HistoryActions): void
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
  handleHistory,
  changeLayerOrder,
  onFillColorChange,
  onStrokeColorChange,
  onFillColorClick,
  onStrokeColorClick,
}): ReactElement => {
  const [firstLoad, setFirstLoad] = useState(true)
  useEffect(() => {
    // Only record color history when fillPicker and strokePicker
    // aren't displayed (ie. when user is completely done picking colors)
    // firstLoad is a bit hacky--we don't want handleHistory() to be called
    // when this component is first loaded
    if (!firstLoad && !displayFillPicker && !displayStrokePicker) {
      handleHistory()
    }
    setFirstLoad(false)
  }, [displayFillPicker, displayStrokePicker])

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
            handleButton={handleHistory}
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
            <SketchPicker color={strokeColor} onChange={onStrokeColorChange} />
          </Popover>
        ) : null}
      </PaletteWrapper>
    </Draggable>
  )
}

export default ToolPalette
