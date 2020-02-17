import Gambar from "gambar"
import { Point, StyleProps } from "gambar/src/geometry"
import { getDiamondPoints } from "./getShapePoints"
import { DrawingToolTypes } from "./tools"

const drawShapes = (
  dwg: Gambar,
  type: DrawingToolTypes,
  start: Point,
  end: Point,
  style: StyleProps,
  save: boolean
): void => {
  switch (type) {
    case DrawingToolTypes.SELECTION:
      if (!save) {
        dwg.rectangle(start, end, { fillColor: "rgba(0, 0, 100, 0.15)" }, save)
      } else {
        dwg.render()
      }
      break
    case DrawingToolTypes.RECTANGLE:
      dwg.rectangle(start, end, style, save)
      break
    case DrawingToolTypes.ELLIPSE:
      dwg.ellipse(start, end, style, save)
      break
    case DrawingToolTypes.LINE:
      dwg.line(start, end, style, save)
      break
    case DrawingToolTypes.DIAMOND: {
      const diamondPts: Point[] = getDiamondPoints(start, end)
      dwg.polygon(diamondPts, style, save)
      break
    }
  }
}

export default drawShapes
