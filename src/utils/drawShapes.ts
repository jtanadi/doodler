import Gambar from "gambar"
import { Point, StyleProps } from "gambar/src/geometry"
import { getDiamondPoints } from "./getShapePoints"

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
        dwg.rectangle(start, end, { fillColor: "rgba(0, 0, 100, 0.15)" }, save)
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

export default drawShapes
