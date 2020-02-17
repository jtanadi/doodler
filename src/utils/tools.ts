enum DrawingToolTypes {
  SELECTION = "SELECTION",
  DIAMOND = "DIAMOND",
  ELLIPSE = "ELLIPSE",
  LINE = "LINE",
  POLYGON = "POLYGON",
  POLYLINE = "POLYLINE",
  RECTANGLE = "RECTANGLE",
}

enum HistoryActions {
  UNDO = "UNDO",
  REDO = "REDO",
}

enum LayerActions {
  PUSH_BACKWARD = "PUSH_BACKWARD",
  PULL_FORWARD = "PULL_FORWARD",
}

type Tool = {
  type: DrawingToolTypes | HistoryActions | LayerActions
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
    type: HistoryActions.UNDO,
    icon: "↶",
  },
  {
    type: HistoryActions.REDO,
    icon: "↷",
  },
]

const layerTools: Tool[] = [
  null,
  {
    type: LayerActions.PUSH_BACKWARD,
    icon: "🔽️",
  },
  {
    type: LayerActions.PULL_FORWARD,
    icon: "🔼️",
  },
]

export {
  DrawingToolTypes,
  HistoryActions,
  LayerActions,
  Tool,
  drawingTools,
  historyTools,
  layerTools,
}
