import React, { useState, ReactElement, MouseEvent, RefObject } from "react"
import Gambar from "gambar"
import { Point, StyleProps, Shape } from "gambar/src/geometry"

import { DrawingToolTypes, drawShapes, HistoryActions } from "../../utils/"

type PropTypes = {
  canvasRef: RefObject<HTMLCanvasElement>
  drawing: Gambar
  currentTool: DrawingToolTypes
  width: number
  height: number
  fillColor: string
  strokeColor: string
  selectedShapes: [Shape, number][]
  onSelectShapes([shape, i]): void
  handleHistory(action?: HistoryActions): void
}

const Canvas: React.FC<PropTypes> = ({
  canvasRef,
  drawing,
  currentTool,
  width,
  height,
  fillColor,
  strokeColor,
  selectedShapes,
  onSelectShapes,
  handleHistory,
}): ReactElement => {
  const [mouseDown, setMouseDown] = useState(false)
  const [startPoint, setStartPoint] = useState(new Point(0, 0))
  const [endPoint, setEndPoint] = useState(new Point(0, 0))

  const handleMouseDown = (ev: MouseEvent): void => {
    const [x, y] = [ev.nativeEvent.offsetX, ev.nativeEvent.offsetY]
    if (x < 0 || y < 0) return

    const pt = new Point(x, y)

    setMouseDown(true)
    if (currentTool === DrawingToolTypes.SELECTION) {
      drawing.selectShapeAtPoint(pt)
    }

    onSelectShapes(drawing.findSelectedShapes())

    setStartPoint(pt)
    setEndPoint(pt)
  }

  const handleMouseMove = (ev: MouseEvent): void => {
    if (!mouseDown) return

    setEndPoint(new Point(ev.nativeEvent.offsetX, ev.nativeEvent.offsetY))

    if (currentTool === DrawingToolTypes.SELECTION && selectedShapes.length) {
      const delta = new Point(
        endPoint.x - startPoint.x,
        endPoint.y - startPoint.y
      )

      drawing.moveSelectedShapes(delta)
      setStartPoint(endPoint)
    } else {
      const marqueeStyle: StyleProps = {
        strokeColor: "gray",
        strokeWidth: 1,
      }

      drawShapes(
        drawing,
        currentTool,
        startPoint,
        endPoint,
        marqueeStyle,
        false
      )
    }
  }

  const handleMouseUp = (): void => {
    const drawingStyle: StyleProps = {
      strokeColor,
      strokeWidth: 1,
      fillColor,
    }

    drawShapes(drawing, currentTool, startPoint, endPoint, drawingStyle, true)

    // Canvas only keeps track of history if something is drawn
    // Layer and color history is taken care of by App
    if (
      currentTool !== DrawingToolTypes.SELECTION &&
      startPoint.x !== endPoint.x &&
      startPoint.y !== endPoint.y
    ) {
      handleHistory()
    }

    setMouseDown(false)
    setStartPoint(new Point(0, 0))
    setEndPoint(new Point(0, 0))
  }

  return (
    <canvas
      id="canvas"
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      width={`${width}px`}
      height={`${height}px`}
    ></canvas>
  )
}

export default Canvas
