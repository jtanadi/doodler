import React, { useState, useEffect, useRef, ReactElement } from "react"
import Gambar from "gambar"

import Canvas from "./Canvas"
import ToolPalette from "./ToolPalette"

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

const App: React.FC<{}> = (): ReactElement => {
  const canvasRef = useRef(null)
  const [drawing, setDrawing] = useState<Gambar | null>(null)
  const [canvasWidth, setCanvasWidth] = useState(0)
  const [canvasHeight, setCanvasHeight] = useState(0)

  const resizeCanvas = (): void => {
    setCanvasWidth(window.innerWidth)
    setCanvasHeight(window.innerHeight)
  }

  useEffect(() => {
    resizeCanvas()
    // document.addEventListener("keypress", this.routeKeyPress)
    // document.addEventListener("keyup", this.routeKeyUp)
    // window.addEventListener("resize", resizeCanvas)

    // return (): void => {
    //   window.removeEventListener("resize", resizeCanvas)
    // }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    setDrawing(new Gambar(canvas, boundingBoxStyle))
  }, [canvasWidth, canvasHeight])

  const [currentTool, setCurrentTool] = useState("selection")
  const pickTool = (type: string): void => {
    setCurrentTool(type)
  }

  const changeHistory = (): void => {}

  return (
    <div id="wrapper">
      <ToolPalette
        currentTool={currentTool}
        pickTool={pickTool}
        changeHistory={changeHistory}
      />
      <Canvas
        drawing={drawing}
        currentTool={currentTool}
        width={canvasWidth}
        height={canvasHeight}
        canvasRef={canvasRef}
      />
    </div>
  )
}

export default App

/*

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
