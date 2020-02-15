import { DrawingToolTypes } from "./tools"
import { Point } from "gambar/src/geometry"

enum HistoryActions {
  DRAW = "DRAW",
  MOVE = "MOVE",
  DELETE = "DELETE",
  CHANGE_LAYER_ORDER = "CHANGE_LAYER_ORDER",
}

type DrawData = {
  shape: DrawingToolTypes
  points: Point[]
}

type MoveData = {
  delta: Point
}

type LayerData = {
  fromIndex: number
  toIndex: number
}

type History = {
  action: HistoryActions
  data: DrawData | MoveData | LayerData
}

export { HistoryActions, History }

/*
[
  {
    action: "DRAW",
    data: {
      shape: "rectangle",
      points: [PointA, PointB] // points needed to recreate shape
    }
  },
  {
    action: "DRAW",
    data: {
      shape: "circle",
      points: [PointA, PointB] // points needed to recreate shape
    }
  },
  {
    action: "MOVE",
    data: {
      delta: Point // difference between mouseDown and mouseUp
    }
  },
  {
    action: "DELETE",
    data: {
      shape: "rectangle"
      id: "1234"
    }
  }

]
*/
