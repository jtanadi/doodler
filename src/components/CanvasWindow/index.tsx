import React, {
  useRef,
  useEffect,
  ReactElement,
  Dispatch,
  SetStateAction,
} from "react"
import { DrawingToolTypes } from "../../utils"
import Gambar from "gambar"
import { Shape } from "gambar/src/geometry"

import Window from "../Window"
import Canvas from "../Canvas"

type PropTypes = {
  drawing: Gambar
  isCurrent: boolean
  canvasWidth: number
  canvasHeight: number
  currentTool: DrawingToolTypes
  strokeColor: string
  fillColor: string
  selectedShapes: [Shape, number][]
  windowTopLocation?: number
  windowLeftLocation?: number
  setSelectedShapes: Dispatch<SetStateAction<[Shape, number][]>>
  handleCurrentDrawing(id: string): void
}

const CanvasWindow: React.FC<PropTypes> = ({
  drawing,
  isCurrent: current,
  canvasWidth,
  canvasHeight,
  currentTool,
  strokeColor,
  fillColor,
  selectedShapes,
  windowTopLocation,
  windowLeftLocation,
  setSelectedShapes,
  handleCurrentDrawing,
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
      useDraggable
      contentWidth={canvasWidth / 16}
      contentHeight={canvasHeight / 16}
      handleClick={(): void => handleCurrentDrawing(drawing.id)}
      top={windowTopLocation || 3}
      left={windowLeftLocation || 6}
      current={current}
    >
      <Canvas
        drawing={drawing}
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
