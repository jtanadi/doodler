import React, { useState, ReactElement, SyntheticEvent } from "react"

import { Point } from "gambar/src/geometry"

type PropTypes = {
  drawing: any
  currentTool: string
  width: number
  height: number
}

const Canvas: React.FC<PropTypes> = ({
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

    switch (currentTool) {
      case "rectangle":
        drawing.rectangle(startPoint, endPoint, marqueeStyle, false)
        break
      default:
        return
    }
  }

  const handleMouseUp = (): void => {
    const drawingStyle = {
      strokeColor: "green",
      strokeWidth: 1,
    }

    switch (currentTool) {
      case "rectangle":
        drawing.rectangle(startPoint, endPoint, drawingStyle)
        break
      default:
        return
    }

    setMouseDown(false)
    setStartPoint(new Point(0, 0))
    setEndPoint(new Point(0, 0))
  }

  return (
    <canvas
      id="canvas"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      width={`${width}px`}
      height={`${height}px`}
    ></canvas>
  )
}

export default Canvas
