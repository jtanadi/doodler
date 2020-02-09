type Tool = {
  type: string
  icon: string
}

const drawingTools: Tool[] = [
  null,
  {
    type: "selection",
    icon: "1",
  },
  {
    type: "rectangle",
    icon: "2",
  },
  {
    type: "ellipse",
    icon: "3",
  },
  {
    type: "line",
    icon: "4",
  },
  {
    type: "diamond",
    icon: "5",
  },
  {
    type: "polyline",
    icon: "6",
  },
]

const historyTools: Tool[] = [
  null,
  {
    type: "undo",
    icon: "↶",
  },
  {
    type: "redo",
    icon: "↷",
  },
]

export { Tool, drawingTools, historyTools }
