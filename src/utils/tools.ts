enum DrawingToolTypes {
  SELECTION = "selection",
  DIAMOND = "diamond",
  ELLIPSE = "ellipse",
  LINE = "line",
  POLYGON = "polygon",
  POLYLINE = "polyline",
  RECTANGLE = "rectangle",
}

enum DrawingActions {
  UNDO = "undo",
  REDO = "redo",
  PUSH_BACKWARD = "pushBackward",
  PULL_FORWARD = "pullForward",
}

type Tool = {
  type: DrawingToolTypes | DrawingActions
  icon: string
  selectedIcon?: string
}

const drawingTools: Tool[] = [
  null,
  {
    type: DrawingToolTypes.SELECTION,
    icon: "👆️",
  },
  {
    type: DrawingToolTypes.RECTANGLE,
    icon: "🔲️",
  },
  {
    type: DrawingToolTypes.ELLIPSE,
    icon: "🔵️",
  },
  {
    type: DrawingToolTypes.LINE,
    icon: "➖️",
  },
  {
    type: DrawingToolTypes.DIAMOND,
    icon: "🔷️",
  },
  {
    type: DrawingToolTypes.POLYLINE,
    icon: "6",
  },
]

const historyTools: Tool[] = [
  null,
  {
    type: DrawingActions.UNDO,
    icon: "↶",
  },
  {
    type: DrawingActions.REDO,
    icon: "↷",
  },
]

const layerTools: Tool[] = [
  null,
  {
    type: DrawingActions.PUSH_BACKWARD,
    icon: "🔽️",
  },
  {
    type: DrawingActions.PULL_FORWARD,
    icon: "🔼️",
  },
]

export {
  DrawingToolTypes,
  DrawingActions,
  Tool,
  drawingTools,
  historyTools,
  layerTools,
}
