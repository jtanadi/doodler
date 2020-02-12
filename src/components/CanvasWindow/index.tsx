import React, {
  useState,
  useRef,
  useEffect,
  ReactElement,
  Dispatch,
  SetStateAction,
} from "react"
import { ToolTypes } from "../../utils"
import Gambar from "gambar"
import { Shape } from "gambar/src/geometry"

import Window from "../BaseWindow"
import Canvas from "../Canvas"

import { boundingBoxStyle } from "../../utils"

type PropTypes = {
  id: string
  current: boolean
  canvasWidth: number
  canvasHeight: number
  currentTool: ToolTypes
  strokeColor: string
  fillColor: string
  selectedShapes: [Shape, number][]
  windowTopLocation?: number
  windowLeftLocation?: number
  setSelectedShapes: Dispatch<SetStateAction<[Shape, number][]>>
  setCurrentDrawing(drawing: ReactElement): void
}

const CanvasWindow: React.FC<PropTypes> = ({
  id,
  current,
  canvasWidth,
  canvasHeight,
  currentTool,
  strokeColor,
  fillColor,
  selectedShapes,
  windowTopLocation,
  windowLeftLocation,
  setSelectedShapes,
  setCurrentDrawing,
}): ReactElement => {
  const [drawing, setDrawing] = useState<Gambar | null>(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const newDrawing = new Gambar(canvas, boundingBoxStyle)
    newDrawing.id = id
    setDrawing(newDrawing)
  }, [])

  useEffect(() => {
    if (drawing) {
      drawing.render()
    }
  }, [strokeColor, fillColor])

  return (
    <Window
      draggable
      contentWidth={canvasWidth / 16}
      contentHeight={canvasHeight / 16}
      handleClick={(): void => setCurrentDrawing(drawing)}
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
