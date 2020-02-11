import { Point } from "gambar/src/geometry"

function getTrianglePoints(start: Point, end: Point): Point[] {
  const pt1 = new Point(start.x + (end.x - start.x) / 2, start.y)
  const pt2 = new Point(start.x, end.y)
  const pt3 = new Point(end.x, end.y)

  return [pt1, pt2, pt3]
}

function getDiamondPoints(start: Point, end: Point): Point[] {
  const a = new Point(start.x + (end.x - start.x) / 2, start.y)
  const b = new Point(end.x, start.y + (end.y - start.y) / 2)
  const c = new Point(start.x + (end.x - start.x) / 2, end.y)
  const d = new Point(start.x, start.y + (end.y - start.y) / 2)

  return [a, b, c, d]
}

export { getTrianglePoints, getDiamondPoints }
