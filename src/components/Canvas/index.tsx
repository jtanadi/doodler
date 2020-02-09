import React, { useState, ReactElement, SyntheticEvent, RefObject } from "react"
import Gambar from "gambar"
import { Point, StyleProps } from "gambar/src/geometry"

import { getDiamondPoints } from "../../utils/getShapePoints"

type PropTypes = {
  canvasRef: RefObject<HTMLCanvasElement>
  drawing: Gambar
  currentTool: string
  width: number
  height: number
}

const drawShapes = (
  dwg: Gambar,
  type: string,
  start: Point,
  end: Point,
  style: StyleProps,
  save: boolean
): void => {
  switch (type) {
    case "selection":
      if (!save) {
        dwg.rectangle(start, end, { fillColor: "rgba(0, 0, 0, 0.25)" }, save)
      } else {
        dwg.render()
      }
      break
    case "rectangle":
      dwg.rectangle(start, end, style, save)
      break
    case "ellipse":
      dwg.ellipse(start, end, style, save)
      break
    case "line":
      dwg.line(start, end, style, save)
      break
    case "diamond": {
      const diamondPts: Point[] = getDiamondPoints(start, end)
      dwg.polygon(diamondPts, style, save)
      break
    }
  }
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

  const handleMouseDown = (ev: SyntheticEvent): void => {
    const [x, y] = [ev.nativeEvent.offsetX, ev.nativeEvent.offsetY]
    if (x < 0 || y < 0) return

    const pt = new Point(x, y)

    setMouseDown(true)
    if (currentTool === "selection") {
      drawing.selectShapeAtPoint(pt)
    }

    setStartPoint(pt)
    setEndPoint(pt)
  }

  const handleMouseMove = (ev: SyntheticEvent): void => {
    if (!mouseDown) return
    setEndPoint(new Point(ev.nativeEvent.offsetX, ev.nativeEvent.offsetY))

    const marqueeStyle = {
      strokeColor: "gray",
      strokeWidth: 1,
    }

    drawShapes(drawing, currentTool, startPoint, endPoint, marqueeStyle, false)
  }

  const handleMouseUp = (): void => {
    const drawingStyle = {
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
