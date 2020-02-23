import React, {
  useRef,
  useEffect,
  ReactElement,
  Dispatch,
  SetStateAction,
  MouseEvent,
} from "react"
import { DrawingToolTypes, HistoryActions } from "../../utils"
import Gambar from "gambar"
import { Shape } from "gambar/src/geometry"

import Window from "../Window"
import Canvas from "../Canvas"

type PropTypes = {
  id: string
  drawing: Gambar
  canvasWidth: number
  canvasHeight: number
  currentTool: DrawingToolTypes
  strokeColor: string
  fillColor: string
  selectedShapes: [Shape, number][]
  windowTopLocation?: number
  windowLeftLocation?: number
  setSelectedShapes: Dispatch<SetStateAction<[Shape, number][]>>
  handleHistory(action?: HistoryActions): void
  handleCurrentDrawing(ev: MouseEvent, id: string): void
  handleClose(ev: MouseEvent): void
}

const CanvasWindow: React.FC<PropTypes> = ({
  id,
  drawing,
  canvasWidth,
  canvasHeight,
  currentTool,
  strokeColor,
  fillColor,
  selectedShapes,
  windowTopLocation,
  windowLeftLocation,
  setSelectedShapes,
  handleHistory,
  handleCurrentDrawing,
  handleClose,
}): ReactElement => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    drawing.setCanvas(canvas)
  }, [])

  useEffect(() => {
    if (drawing) {
      drawing.render()
    }
  }, [strokeColor, fillColor])

  return (
    <Window
      id={id}
      useDraggable
      contentWidth={canvasWidth / 16}
      contentHeight={canvasHeight / 16}
      handleClick={(ev: MouseEvent): void => handleCurrentDrawing(ev, id)}
      top={windowTopLocation || 3}
      left={windowLeftLocation || 6}
      handleClose={handleClose}
    >
      <Canvas
        drawing={drawing}
        handleHistory={handleHistory}
        currentTool={currentTool}
        width={canvasWidth}
        height={canvasHeight}
        canvasRef={canvasRef}
        fillColor={fillColor}
        strokeColor={strokeColor}
        selectedShapes={selectedShapes}
        onSelectShapes={setSelectedShapes}
      />
    </Window>
  )
}

export default CanvasWindow
