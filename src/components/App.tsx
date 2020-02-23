import React, { useState, useEffect, ReactElement, MouseEvent } from "react"
import styled from "styled-components"
import Gambar from "gambar"
import { Shape } from "gambar/src/geometry"
import nanoid from "nanoid"
import _ from "lodash"

import ToolPalette from "./ToolPalette"
import CanvasWindow from "./CanvasWindow"
import AddButton from "./AddButton"

import {
  boundingBoxStyle,
  DrawingToolTypes,
  HistoryActions,
  LayerActions,
  parseColor,
} from "../utils"

const DEFAULT_CANVAS_WIDTH = 600
const DEFAULT_CANVAS_HEIGHT = 400

const Cover = styled.div`
  position: absolute;
  inset: 0;
  z-index: 97;
`

const App: React.FC<{}> = (): ReactElement => {
  const [drawings, setDrawings] = useState([])
  const handleAddDrawing = (): void => {
    setDrawings(prev => {
      const newDwg = new Gambar()
      newDwg.id = nanoid()
      newDwg.setBoundingBoxStyle(boundingBoxStyle)
      newDwg.top = (prev.length + 1) * 3
      newDwg.left = prev.length * 3 + 10

      return [...prev, newDwg]
    })
  }

  const keydownHandler = (ev: KeyboardEvent): void => {
    switch (ev.keyCode) {
      // cap N
      case 78:
        handleAddDrawing()
        break
    }
  }

  useEffect(() => {
    handleAddDrawing()
    document.addEventListener("keydown", keydownHandler)

    return (): void => {
      document.removeEventListener("keydown", keydownHandler)
    }
  }, [])

  const handleCurrentDrawing = (ev: MouseEvent, id: string): void => {
    // If either minimize or close button is clicked,
    // don't make window current (just perform button action)
    const target = ev.target as HTMLElement
    if (target.nodeName === "BUTTON") return

    // Top most drawing is already current drawing
    const currentDrawing = drawings[drawings.length - 1]
    if (id === currentDrawing.id) return

    setDrawings(prev => {
      const newCurrentIdx = drawings.findIndex(drawing => drawing.id === id)
      const newCurrentDwg = drawings[newCurrentIdx]
      currentDrawing.clearSelection()
      prev.splice(newCurrentIdx, 1)
      return [...prev, newCurrentDwg]
    })
  }

  const handleCloseDrawing = (ev: MouseEvent): void => {
    // Get button and find its grandparent (window),
    // which has id set to drawing.id
    // Kind of janky?
    const button = ev.target as HTMLElement
    const idToClose = button.parentElement.parentElement.id

    setDrawings(drawings =>
      drawings.filter(drawing => drawing.id !== idToClose)
    )
  }

  const [currentTool, setCurrentTool] = useState(DrawingToolTypes.SELECTION)
  const handlePickTool = (type: DrawingToolTypes): void => {
    setCurrentTool(type)
  }

  type DrawingHistory = {
    past: Array<Shape[]>
    present: Shape[]
    future: Array<Shape[]>
  }

  const initialHistory: DrawingHistory = {
    past: [],
    present: [],
    future: [],
  }

  const [appHistory, setAppHistory] = useState({})
  useEffect(() => {
    if (!drawings.length) return
    setAppHistory(prev => {
      const initial = drawings.reduce((acc, drawing) => {
        if (!acc[drawing.id]) {
          return { ...acc, [drawing.id]: initialHistory }
        }
        return acc
      }, prev)
      return initial
    })
  }, [drawings.length])

  const handleHistory = (action?: HistoryActions): void => {
    // Implementation based on https://redux.js.org/recipes/implementing-undo-history/
    // TODO: Seems like a good place to use immutable.js

    const currentDrawing = drawings[drawings.length - 1]
    const dwgHistory = appHistory[currentDrawing.id]

    let newHistory: DrawingHistory
    if (action === HistoryActions.UNDO) {
      const newPresent: Shape[] = dwgHistory.past[dwgHistory.past.length - 1]
      if (!newPresent) return

      const newPast: Array<Shape[]> = dwgHistory.past.slice(
        0,
        dwgHistory.past.length - 1
      )

      newHistory = {
        past: newPast,
        present: newPresent,
        future: [dwgHistory.present, ...dwgHistory.future],
      }

      currentDrawing.shapes = [...newPresent]
      currentDrawing.render()
    } else if (action === HistoryActions.REDO) {
      const newPresent: Shape[] = dwgHistory.future[0]
      if (!newPresent) return

      const newFuture: Array<Shape[]> = dwgHistory.future.slice(1)

      newHistory = {
        past: [...dwgHistory.past, dwgHistory.present],
        present: newPresent,
        future: newFuture,
      }

      currentDrawing.shapes = [...newPresent]
      currentDrawing.render()
    } else {
      newHistory = {
        past: [...dwgHistory.past, [...dwgHistory.present]],
        present: [...currentDrawing.shapes],
        future: [],
      }
    }
    setAppHistory(prev => {
      prev[currentDrawing.id] = newHistory
      return prev
    })
  }

  const handleDelete = (): void => {
    const currentDrawing = drawings[drawings.length - 1]
    currentDrawing.deleteSelectedShapes()
    handleHistory()
  }

  const deleteKeydownHandler = (ev: KeyboardEvent): void => {
    // Only listen to the delete key
    if (ev.keyCode !== 8) return
    handleDelete()
  }

  useEffect(() => {
    // Attach & clean up delete keydown listener every time
    // appHistory or currentDrawing changes so we have access
    // to the latest appHistory and currentDrawing
    window.addEventListener("keydown", deleteKeydownHandler)

    return (): void => {
      window.removeEventListener("keydown", deleteKeydownHandler)
    }
  }, [appHistory, drawings[drawings.length - 1]])

  const handleChangeLayerOrder = (type: LayerActions): void => {
    const currentDrawing = drawings[drawings.length - 1]

    if (type === LayerActions.PUSH_BACKWARD) {
      currentDrawing.pushSelectedShapesBackward()
    } else if (type === LayerActions.PULL_FORWARD) {
      currentDrawing.pullSelectedShapesForward()
    }
    handleHistory()
  }

  const [selectedShapes, setSelectedShapes] = useState<[Shape, number][]>([])

  const [appFillColor, setAppFillColor] = useState("#fff")
  const [appStrokeColor, setAppStrokeColor] = useState("#000")

  const [currentFillColor, setCurrentFillColor] = useState(appFillColor)
  const [currentStrokeColor, setCurrentStrokeColor] = useState(appStrokeColor)
  useEffect(() => {
    if (!selectedShapes.length) {
      setCurrentStrokeColor(appStrokeColor)
      setCurrentFillColor(appFillColor)
    } else {
      const { fillColor, strokeColor } = selectedShapes[0][0]
      let sameStrokeColor = true
      let sameFillColor = true

      for (const [shape] of selectedShapes) {
        if (shape.fillColor !== fillColor) {
          sameFillColor = false
        }
        if (shape.strokeColor !== strokeColor) {
          sameStrokeColor = false
        }
      }
      setCurrentStrokeColor(sameStrokeColor ? strokeColor : "")
      setCurrentFillColor(sameFillColor ? fillColor : "")
    }
  }, [selectedShapes])

  const handleFillColor = (color): void => {
    const rgba = parseColor(color)
    if (!selectedShapes.length) {
      setAppFillColor(rgba)
    } else {
      // Maybe not the right way of doing this
      // or not the right place for this
      // See if this should be handled by Gambar
      const currentDrawing = drawings[drawings.length - 1]
      currentDrawing.shapes = currentDrawing.shapes.map(shape => {
        if (shape.selected) {
          // To keep track of history, we have to make a copy
          // of objects with new fillColor
          const newShape = _.cloneDeep(shape)
          newShape.fillColor = rgba
          return newShape
        }
        return shape
      })
    }
    setCurrentFillColor(rgba)
  }

  const handleStrokeColor = (color): void => {
    const rgba = parseColor(color)
    if (!selectedShapes.length) {
      setAppStrokeColor(rgba)
    } else {
      // Same note as handleFillColor
      const currentDrawing = drawings[drawings.length - 1]
      currentDrawing.shapes = currentDrawing.shapes.map(shape => {
        if (shape.selected) {
          const newShape = _.cloneDeep(shape)
          newShape.strokeColor = rgba
          return newShape
        }
        return shape
      })
    }
    setCurrentStrokeColor(rgba)
  }

  const [displayFillPicker, setDisplayFillPicker] = useState(false)
  const [displayStrokePicker, setDisplayStrokePicker] = useState(false)

  const handleFillClick = (): void => {
    setDisplayStrokePicker(false)
    setDisplayFillPicker(prev => !prev)
  }

  const handleStrokeClick = (): void => {
    setDisplayFillPicker(false)
    setDisplayStrokePicker(prev => !prev)
  }

  const handleCloseCover = (): void => {
    setDisplayFillPicker(false)
    setDisplayStrokePicker(false)
  }

  return (
    <>
      <ToolPalette
        currentTool={currentTool}
        pickTool={handlePickTool}
        handleHistory={handleHistory}
        changeLayerOrder={handleChangeLayerOrder}
        fillColor={currentFillColor}
        strokeColor={currentStrokeColor}
        onFillColorChange={handleFillColor}
        onStrokeColorChange={handleStrokeColor}
        displayFillPicker={displayFillPicker}
        onFillColorClick={handleFillClick}
        displayStrokePicker={displayStrokePicker}
        onStrokeColorClick={handleStrokeClick}
      />
      {displayFillPicker || displayStrokePicker ? (
        <Cover onClick={handleCloseCover} />
      ) : null}
      {drawings.map(drawing => (
        <CanvasWindow
          key={drawing.id}
          id={drawing.id}
          drawing={drawing}
          handleHistory={handleHistory}
          canvasWidth={DEFAULT_CANVAS_WIDTH}
          canvasHeight={DEFAULT_CANVAS_HEIGHT}
          currentTool={currentTool}
          strokeColor={currentStrokeColor}
          fillColor={currentFillColor}
          selectedShapes={selectedShapes}
          setSelectedShapes={setSelectedShapes}
          handleCurrentDrawing={handleCurrentDrawing}
          windowTopLocation={drawing.top}
          windowLeftLocation={drawing.left}
          handleClose={handleCloseDrawing}
        />
      ))}
      <AddButton handleAdd={handleAddDrawing} />
    </>
  )
}

export default App

/*
OLD IMPLEMENTATION
KEEP FOR REFERENCE (FOR NOW)

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      drawing: {},
      currentTool: "rectangle",
      canvasWidth: 0,
      canvasHeight: 0,
      drawingTools,
    }
    this.child = React.createRef()

    this.pickTool = this.pickTool.bind(this)
    this.routeKeyPress = this.routeKeyPress.bind(this)
    this.routeKeyUp = this.routeKeyUp.bind(this)
    this.changeHistory = this.changeHistory.bind(this)
    this.updateCanvasSize = this.updateCanvasSize.bind(this)
  }

  routeKeyPress(ev) {
    const { drawingTools } = this.state
    const numKey = parseInt(ev.key)
    if (numKey > 0 && numKey <= Object.keys(drawingTools).length) {
      const idx = numKey - 1
      const selectedTool = Object.keys(drawingTools)[idx]
      this.pickTool(selectedTool)
    } else if (ev.key === "u") {
      console.log("u")
    } else if (ev.key === "r") {
      console.log("r")
    }
  }

  routeKeyUp(ev) {
    if (ev.key === "u") {
      this.removeSelectedClass(this.state.undoButton)
    } else if (ev.key === "r") {
      this.removeSelectedClass(this.state.redoButton)
    }
  }

  addSelectedClass(target) {
    target.classList.add("selected")
  }

  removeSelectedClass(target) {
    target.classList.remove("selected")
  }

  pickTool(tool) {
    this.setState({ currentTool: tool })
  }

  changeHistory(action) {
    console.log("history", action)
  }

  updateCanvasSize() {
    const canvasWidth = window.innerWidth
    const canvasHeight = window.innerHeight

    this.setState({ canvasWidth, canvasHeight })
  }

  componentDidMount() {
    const canvas = document.getElementById("canvas")
    const drawing = new Gambar(canvas)

    const canvasWidth = window.innerWidth
    const canvasHeight = window.innerHeight

    this.setState({
      drawing,
      canvasWidth,
      canvasHeight,
    })

    document.addEventListener("keypress", this.routeKeyPress)
    document.addEventListener("keyup", this.routeKeyUp)
    // window.addEventListener("resize", this.updateCanvasSize)
  }

  componentWillUnmount() {
    document.removeEventListener("keypress", this.routeKeyPress)
    document.removeEventListener("keyup", this.routeKeyUp)
    // window.removeEventListener("resize", this.updateCanvasSize)
  }

  render() {
    const {
      currentTool,
      drawing,
      canvasWidth,
      canvasHeight,
      drawingTools,
    } = this.state

    return (
      <div id="wrapper">
        <ToolPalette
          drawingTools={drawingTools}
          currentTool={currentTool}
          pickTool={this.pickTool}
          changeHistory={this.changeHistory}
          addSelected={this.addSelectedClass}
          removeSelected={this.removeSelectedClass}
        />
        <Canvas
          drawing={drawing}
          currentTool={currentTool}
          width={canvasWidth}
          height={canvasHeight}
        />
      </div>
    )
  }
}
*/
