// const drawingTools = {
//   "rect": "1",
//   "ellipse": "2",
//   "line": "3",
//   "polyline": "4",
//   "brush": "5",
//   "text": "6",
// }

const drawingTools = [
  null,
  {
    shape: "rectangle",
    icon: "1",
  },
  {
    shape: "ellipse",
    icon: "2",
  },
  {
    shape: "line",
    icon: "3",
  },
  {
    shape: "polygon",
    icon: "4",
  },
  {
    shape: "polyline",
    icon: "5",
  },
]

const historyTools = {
  undo: "↶",
  redo: "↷",
}

export { drawingTools, historyTools }
