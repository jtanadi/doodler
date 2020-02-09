enum ToolTypes {
  SELECTION = "selection",
  DIAMOND = "diamond",
  ELLIPSE = "ellipse",
  LINE = "line",
  POLYGON = "polygon",
  POLYLINE = "polyline",
  RECTANGLE = "rectangle",
  UNDO = "undo",
  REDO = "redo",
  PUSH_BACKWARD = "pushBackward",
  PULL_FORWARD = "pullForward",
}

type Tool = {
  type: ToolTypes
  icon: string
  selectedIcon?: string
}

const drawingTools: Tool[] = [
  null,
  {
    type: ToolTypes.SELECTION,
    icon: "👆️",
  },
  {
    type: ToolTypes.RECTANGLE,
    icon: "🔲️",
  },
  {
    type: ToolTypes.ELLIPSE,
    icon: "🔵️",
  },
  {
    type: ToolTypes.LINE,
    icon: "➖️",
  },
  {
    type: ToolTypes.DIAMOND,
    icon: "🔷️",
  },
  {
    type: ToolTypes.POLYLINE,
    icon: "6",
  },
]

const historyTools: Tool[] = [
  null,
  {
    type: ToolTypes.UNDO,
    icon: "↶",
  },
  {
    type: ToolTypes.REDO,
    icon: "↷",
  },
]

const layerTools: Tool[] = [
  null,
  {
    type: ToolTypes.PUSH_BACKWARD,
    icon: "🔽️",
  },
  {
    type: ToolTypes.PULL_FORWARD,
    icon: "🔼️",
  },
]

export { ToolTypes, Tool, drawingTools, historyTools }
