import Gambar from "gambar"
import { Point, StyleProps } from "gambar/src/geometry"
import { getDiamondPoints } from "./getShapePoints"
import { ToolTypes } from "./tools"

const drawShapes = (
  dwg: Gambar,
  type: ToolTypes,
  start: Point,
  end: Point,
  style: StyleProps,
  save: boolean
): void => {
  switch (type) {
    case ToolTypes.SELECTION:
      if (!save) {
        dwg.rectangle(start, end, { fillColor: "rgba(0, 0, 100, 0.15)" }, save)
      } else {
        dwg.render()
      }
      break
    case ToolTypes.RECTANGLE:
      dwg.rectangle(start, end, style, save)
      break
    case ToolTypes.ELLIPSE:
      dwg.ellipse(start, end, style, save)
      break
    case ToolTypes.LINE:
      dwg.line(start, end, style, save)
      break
    case ToolTypes.DIAMOND: {
      const diamondPts: Point[] = getDiamondPoints(start, end)
      dwg.polygon(diamondPts, style, save)
      break
    }
  }
}

export default drawShapes
