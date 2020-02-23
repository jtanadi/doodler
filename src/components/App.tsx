import React, { useState, useEffect, ReactElement, MouseEvent } from "react"
import styled from "styled-components"
import Gambar from "gambar"
import { Shape } from "gambar/src/geometry"
import nanoid from "nanoid"
import _ from "lodash"

import HelpWindow from "./HelpWindow"
import ToolPalette from "./ToolPalette"
import CanvasWindow from "./CanvasWindow"
import RoundButton from "./RoundButton"

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

  const handleChangeLayerOrder = (type: LayerActions): void => {
    const currentDrawing = drawings[drawings.length - 1]

    if (type === LayerActions.PUSH_BACKWARD) {
      currentDrawing.pushSelectedShapesBackward()
    } else if (type === LayerActions.PULL_FORWARD) {
      currentDrawing.pullSelectedShapesForward()
    }
    handleHistory()
  }

  // App-level keydown handler
  // only initialized once, after component is mountd
  const appKeydownHandler = (ev: KeyboardEvent): void => {
    switch (ev.keyCode) {
      // n
      case 78:
        handleAddDrawing()
        break

      // 1 (not num pad)
      case 49:
        handlePickTool(DrawingToolTypes.SELECTION)
        break

      // 2 (not num pad)
      case 50:
        handlePickTool(DrawingToolTypes.RECTANGLE)
        break

      // 3 (not num pad)
      case 51:
        handlePickTool(DrawingToolTypes.ELLIPSE)
        break

      // 4 (not num pad)
      case 52:
        handlePickTool(DrawingToolTypes.DIAMOND)
        break

      // 5 (not num pad)
      case 53:
        handlePickTool(DrawingToolTypes.LINE)
        break

      // 6 (not num pad)
      case 54:
        handlePickTool(DrawingToolTypes.POLYLINE)
        break
    }
  }

  // Drawing-specific keydown handler, updated every time
  // appHistory or currentDrawing is re-initialized
  const drawingKeydownHandler = (ev: KeyboardEvent): void => {
    switch (ev.keyCode) {
      // backspace
      case 8:
        handleDelete()
        break

      // u
      case 85:
        handleHistory(HistoryActions.UNDO)
        break

      // r
      case 82:
        handleHistory(HistoryActions.REDO)
        break

      // ]
      case 221:
        handleChangeLayerOrder(LayerActions.PULL_FORWARD)
        break

      // [
      case 219:
        handleChangeLayerOrder(LayerActions.PUSH_BACKWARD)
        break
    }
  }

  useEffect(() => {
    handleAddDrawing()
    document.addEventListener("keydown", appKeydownHandler)

    return (): void => {
      document.removeEventListener("keydown", appKeydownHandler)
    }
  }, [])

  useEffect(() => {
    // Attach & clean up drawing-specific keydown listener every time
    // appHistory or currentDrawing changes so we have access
    // to the latest appHistory and currentDrawing
    window.addEventListener("keydown", drawingKeydownHandler)

    return (): void => {
      window.removeEventListener("keydown", drawingKeydownHandler)
    }
  }, [appHistory, drawings[drawings.length - 1]])

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
          // TODO: Use immutable.js
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

  const [displayHelp, setDisplayHelp] = useState(false)
  const handleHelp = (): void => {
    setDisplayHelp(display => !display)
  }

  return (
    <>
      {displayHelp && <HelpWindow handleClose={(): void => handleHelp()} />}

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

      <RoundButton top="1.5rem" right="1.5rem" onClick={handleHelp}>
        ?
      </RoundButton>
      <RoundButton bottom="1.5rem" right="1.5rem" onClick={handleAddDrawing}>
        +
      </RoundButton>
    </>
  )
}

export default App
