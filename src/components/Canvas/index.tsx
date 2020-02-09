import React, { useState, ReactElement, SyntheticEvent, RefObject } from "react"
import Gambar from "gambar"
import { Point, StyleProps } from "gambar/src/geometry"

import { drawShapes } from "../../utils/"

type PropTypes = {
  canvasRef: RefObject<HTMLCanvasElement>
  drawing: Gambar
  currentTool: string
  width: number
  height: number
}

const Canvas: React.FC<PropTypes> = ({
  canvasRef,
  drawing,
  currentTool,
  width,
  height,
}): ReactElement => {
  const [mouseDown, setMouseDown] = useState(false)
  const [startPoint, setStartPoint] = useState(new Point(0, 0))
  const [endPoint, setEndPoint] = useState(new Point(0, 0))

  const [shapesSelected, setShapesSelected] = useState(false)

  const handleMouseDown = (ev: SyntheticEvent): void => {
    const [x, y] = [ev.nativeEvent.offsetX, ev.nativeEvent.offsetY]
    if (x < 0 || y < 0) return

    const pt = new Point(x, y)

    setMouseDown(true)
    if (currentTool === "selection") {
      const selectedShape = drawing.selectShapeAtPoint(pt)
      setShapesSelected(!!selectedShape)
    }

    setStartPoint(pt)
    setEndPoint(pt)
  }

  const handleMouseMove = (ev: SyntheticEvent): void => {
    if (!mouseDown) return

    setEndPoint(new Point(ev.nativeEvent.offsetX, ev.nativeEvent.offsetY))

    if (currentTool === "selection" && shapesSelected) {
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
      strokeColor: "green",
      strokeWidth: 1,
      fillColor: "white",
    }

    drawShapes(drawing, currentTool, startPoint, endPoint, drawingStyle, true)

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
