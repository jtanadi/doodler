import React, { useState, useEffect, useRef, ReactElement } from "react"
import styled from "styled-components"
import Gambar from "gambar"
import { Shape } from "gambar/src/geometry"

import Canvas from "./Canvas"
import ToolPalette from "./ToolPalette"

import { ToolTypes, parseColor } from "../utils"

const boundingBoxStyle = {
  edgeStyle: {
    strokeColor: "#0D98BA",
    strokeWidth: 2,
  },
  nodeStyle: {
    strokeColor: "black",
    strokeWidth: 1,
    fillColor: "white",
  },
}

const HISTORY = []

const Cover = styled.div`
  position: absolute;
  inset: 0;
`

const App: React.FC<{}> = (): ReactElement => {
  const canvasRef = useRef(null)
  const [drawing, setDrawing] = useState<Gambar | null>(null)
  const [canvasWidth, setCanvasWidth] = useState(0)
  const [canvasHeight, setCanvasHeight] = useState(0)

  const resizeCanvas = (): void => {
    setCanvasWidth(window.innerWidth)
    setCanvasHeight(window.innerHeight)
  }

  const keypress = (ev: KeyboardEvent): void => {
    // backspace
    if (ev.keyCode === 8) {
      drawing.deleteSelectedShapes()
    }
  }

  useEffect(() => {
    resizeCanvas()
    // document.addEventListener("keyup", this.routeKeyUp)
    // window.addEventListener("resize", resizeCanvas)

    // return (): void => {
    // window.removeEventListener("resize", resizeCanvas)
    // }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    setDrawing(new Gambar(canvas, boundingBoxStyle))
    document.addEventListener("keydown", keypress)

    return (): void => {
      document.removeEventListener("keydown", keypress)
    }
  }, [canvasWidth, canvasHeight])

  const [currentTool, setCurrentTool] = useState(ToolTypes.SELECTION)
  const handlePickTool = (type: ToolTypes): void => {
    setCurrentTool(type)
  }

  const handleChangeHistory = (type: ToolTypes): void => {
    if (type === ToolTypes.UNDO) {
      const shape = drawing.popShape()
      if (shape) {
        HISTORY.push(shape)
      }
    } else if (type === ToolTypes.REDO) {
      const shape = HISTORY.pop()
      if (shape) {
        drawing.pushShape(shape)
      }
    }
  }

  const handleChangeLayerOrder = (type: ToolTypes): void => {
    if (type === ToolTypes.PUSH_BACKWARD) {
      drawing.pushSelectedShapesBackward()
    } else if (type === ToolTypes.PULL_FORWARD) {
      drawing.pullSelectedShapesForward()
    }
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
      for (const [shape] of selectedShapes) {
        shape.fillColor = rgba
      }
      drawing.render()
    }
    setCurrentFillColor(rgba)
  }

  const handleStrokeColor = (color): void => {
    const rgba = parseColor(color)
    if (!selectedShapes.length) {
      setAppStrokeColor(rgba)
    } else {
      for (const [shape] of selectedShapes) {
        shape.strokeColor = rgba
      }
      drawing.render()
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
    <div id="wrapper">
      <ToolPalette
        currentTool={currentTool}
        pickTool={handlePickTool}
        changeHistory={handleChangeHistory}
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
      <Canvas
        drawing={drawing}
        currentTool={currentTool}
        width={canvasWidth}
        height={canvasHeight}
        canvasRef={canvasRef}
        fillColor={appFillColor}
        strokeColor={appStrokeColor}
        selectedShapes={selectedShapes}
        onSelectShapes={setSelectedShapes}
      />
    </div>
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
